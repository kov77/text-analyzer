import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FileUploader from './index';

describe('FileUploader', () => {
  const setup = () => {
    const onFileUpload = jest.fn();
    const utils = render(<FileUploader onFileUpload={onFileUpload} />);
    const fileInput = utils.container.querySelector('input[type="file"]');
    const browseButton = utils.getByText('Browse');
    const analyzeButton = utils.getByText('Analyze');
    const fileNameSpan = utils.container.querySelector('.fileName');
    const removeButton = utils.container.querySelector('.removeButton');
    return {
      onFileUpload,
      fileInput,
      browseButton,
      analyzeButton,
      fileNameSpan,
      removeButton,
      ...utils,
    };
  };

  test('renders without crashing', () => {
    const { getByText } = setup();
    expect(getByText('Upload text file')).toBeInTheDocument();
  });

  test('can choose and read a file', async () => {
    const { fileInput, fileNameSpan } = setup();
    const file = new File(['test'], 'text.txt', { type: 'text/plain' });

    fireEvent.change(fileInput!, { target: { files: [file] } });

    await waitFor(() => expect(fileNameSpan).toHaveTextContent('text.txt'));
  });

  test('can remove the file', async () => {
    const { fileInput, fileNameSpan } = setup();
    const file = new File(['test'], 'text.txt', { type: 'text/plain' });

    fireEvent.change(fileInput!, { target: { files: [file] } });

    await waitFor(() => expect(fileNameSpan).toHaveTextContent('text.txt'));

    // The remove button should appear after a file is chosen
    const removeButton = document.querySelector('.removeButton');
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton!);

    await waitFor(() => expect(fileNameSpan).toHaveTextContent('No file chosen'));
  });

  test('calls onFileUpload with file content when clicking analyze', async () => {
    const { fileInput, analyzeButton, onFileUpload } = setup();
    const file = new File(['test'], 'text.txt', { type: 'text/plain' });

    fireEvent.change(fileInput!, { target: { files: [file] } });

    await waitFor(() => expect(analyzeButton).not.toBeDisabled());

    fireEvent.click(analyzeButton);

    expect(onFileUpload).toHaveBeenCalledWith('test');
  });

  test('analyze button is disabled when no file is uploaded', () => {
    const { analyzeButton } = setup();
    expect(analyzeButton).toBeDisabled();
  });
});

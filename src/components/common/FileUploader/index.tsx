import React, { useRef, useState, useCallback } from 'react';
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import styles from './FileUploader.module.scss';

interface FileUploaderProps {
  onFileUpload: (text: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [fileState, setFileState] = useState({ content: '', name: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileRead = useCallback((event: ProgressEvent<FileReader>) => {
    const content = event.target?.result;
    if (content) {
      setFileState(prevState => ({ ...prevState, content: content as string }));
    }
  }, []);

  const handleFileChosen = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileState({ name: file.name, content: '' });
      const fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
    }
  }, [handleFileRead]);

  const handleFileRemove = useCallback(() => {
    setFileState({ name: '', content: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <Container className={styles.container}>
      <Row className={styles.wrapper}>
        <Col>
          <h2>Upload text file</h2>
          <Form>
            <Form.Group controlId="formFile" className={styles.formFile}>
              <Stack direction="horizontal" gap={4} className={styles.browseWrapper}>
                <Button
                  variant="outline-primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse
                </Button>
                <Stack direction="horizontal" gap={2}>
                  <Form.Control
                    type="file"
                    accept=".txt"
                    onChange={handleFileChosen}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  <span className={styles.fileName}>{fileState.name || 'No file chosen'}</span>
                  {fileState.name && (
                    <span
                      className={styles.removeButton}
                      onClick={handleFileRemove}
                    >
                    &times;
                  </span>
                  )}
                </Stack>
              </Stack>
            </Form.Group>
            <Button
              disabled={!fileState.content}
              variant="danger"
              onClick={() => onFileUpload(fileState.content)}
              className={styles.analyzeButton}
            >
              Analyze
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FileUploader;

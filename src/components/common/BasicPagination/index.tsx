import React from 'react';
import { Pagination } from 'react-bootstrap';

type PaginationComponentProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

const BasicPagination = ({ currentPage, totalPages, onPageChange }: PaginationComponentProps) => {
  return (
    <Pagination style={{ marginTop: '20px' }}>
      {Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default BasicPagination;

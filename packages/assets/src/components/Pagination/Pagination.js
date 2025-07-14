import React from 'react';
import {Pagination, Box, Text, InlineStack} from '@shopify/polaris';

/**
 * Component phân trang có thể tái sử dụng
 * @param {object} props
 * @param {number} props.currentPage - Trang hiện tại
 * @param {number} props.totalPages - Tổng số trang
 * @param {function} props.onPrevious - Hàm gọi khi nhấn nút Previous
 * @param {function} props.onNext - Hàm gọi khi nhấn nút Next
 * @returns {React.ReactElement|null}
 */
const PaginationComponent = ({currentPage, totalPages, onPrevious, onNext}) => {
  if (totalPages <= 1) {
    return null; // Không hiển thị phân trang nếu chỉ có 1 trang
  }

  return (
    <Box paddingBlockStart="400" paddingBlockEnd="200">
      <InlineStack align="center" gap="400">
        <Text as="p" variant="bodyMd">
          Page {currentPage} of {totalPages}
        </Text>
        <Pagination
          hasPrevious={currentPage > 1}
          onPrevious={onPrevious}
          hasNext={currentPage < totalPages}
          onNext={onNext}
        />
      </InlineStack>
    </Box>
  );
};

export default PaginationComponent;

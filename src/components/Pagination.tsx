import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const LARGE_PAGE_RANGE = 5;
const SMALL_PAGE_RANGE = 3;

interface PaginationProps {
  count: number;
  limit: number;
  onChange: (page: number) => void;
}

const Pagination = ({ count, limit, onChange }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(count / limit);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onChange(page);
  };

  const goToPreviousPage = () => handleClick(Math.max(1, currentPage - 1));
  const goToNextPage = () => handleClick(Math.min(totalPages, currentPage + 1));

  // Determine the range of pages to display
  const getPaginationRange = (rangeSize: number) => {
    let start = Math.max(2, currentPage - Math.floor(rangeSize / 2));
    const end = Math.min(totalPages - 1, start + rangeSize - 1);

    // Adjust the start if the range exceeds the totalPages
    start = Math.max(2, end - rangeSize + 1);

    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const range = getPaginationRange(LARGE_PAGE_RANGE);

  const style =
    'btn join-item w-8 xs:w-10 sm:w-12 border-none bg-black-pearl-800 p-0 text-black-pearl-50 hover:bg-black-pearl-700 disabled:bg-black-pearl-800 disabled:opacity-50 disabled:text-black-pearl-200 xs:w-10 sm:flex';

  const activeStyle = '!bg-anzac-400 !text-black-pearl-950 !opacity-100';

  return (
    <div className="join">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={style}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      {/* Always display page 1 */}
      <button
        onClick={() => handleClick(1)}
        disabled={currentPage === 1}
        className={`${style} ${currentPage === 1 ? activeStyle : ''}`}
      >
        1
      </button>

      {/* Show ellipsis if there are pages between 1 and the start of the range */}
      {range[0] > 2 && (
        <span className="join-item hidden w-7 items-center justify-center p-0 text-black-pearl-100 opacity-80 xs:flex xs:w-10 sm:w-12">
          ...
        </span>
      )}

      {/* Display the calculated range of page numbers */}
      {range.map((page, index) => (
        <button
          key={index}
          onClick={() => handleClick(page)}
          disabled={currentPage === page}
          className={`${style} ${currentPage === page ? activeStyle : ''} ${
            !getPaginationRange(SMALL_PAGE_RANGE).includes(page) ? 'hidden' : ''
          }`}
        >
          {page}
        </button>
      ))}

      {/* Show ellipsis if there are pages between the end of the range and the last page */}
      {range[range.length - 1] < totalPages - 1 && (
        <span className="join-item hidden w-7 items-center justify-center p-0 text-black-pearl-100  opacity-80 xs:flex xs:w-10 sm:w-12">
          ...
        </span>
      )}

      {/* Always display the last page if totalPages is greater than 1 */}
      {totalPages > 1 && (
        <button
          onClick={() => handleClick(totalPages)}
          disabled={currentPage === totalPages}
          className={`${style} ${
            currentPage === totalPages ? activeStyle : ''
          }`}
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={style}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;

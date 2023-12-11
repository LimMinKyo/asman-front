import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import ReactPagination from 'react-paginate';

interface Props {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, pageCount, onPageChange }: Props) {
  return (
    <ReactPagination
      previousLabel={<FaChevronLeft />}
      nextLabel={<FaChevronRight />}
      onPageChange={({ selected }) => {
        onPageChange(selected + 1);
      }}
      forcePage={page - 1}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      className="flex justify-center items-center gap-2 py-8"
      pageClassName="w-7 h-7 flex justify-center items-center"
      activeClassName="bg-black rounded-full text-white"
    />
  );
}

import { Dividend } from 'src/api/dividends/entities/dividend.entity';
import DividendModal from '../modals/dividends/DividendModal';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function DividendList({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ul className="min-h-[700px]">{children}</ul>;
}

DividendList.Item = ({ data }: { data: Dividend }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li className="py-2">
        <button
          className="w-full flex justify-between items-center border p-3 rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex-1 text-left text-sm">
            {dayjs(data.dividendAt).format('YYYY-MM-DD')}
          </div>
          <div className="flex-1 font-semibold">{data.name}</div>
          <div className="flex-1 text-right">
            {`${(data.dividend - (data.tax || 0)).toLocaleString()}`}
            <span className="text-xs ml-1 font-semibold">{data.unit}</span>
          </div>
        </button>
      </li>
      <DividendModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        defaultValues={data}
      />
    </>
  );
};

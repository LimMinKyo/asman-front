import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import dayjs from 'dayjs';

export default function DatePicker({ ...rest }: ReactDatePickerProps) {
  return (
    <ReactDatePicker
      locale={ko}
      dateFormat="yyyy-MM-dd"
      placeholderText="YYYY-MM-DD"
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="w-full flex items-center justify-between px-4 py-1">
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            type="button"
            className={`
                ${prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                inline-flex p-1 text-sm font-medium text-gray-700 bg-white rounded
              `}
          >
            <FaChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="text-lg font-bold text-gray-700 flex gap-1">
            <span>{dayjs(date).format('YYYY')}년</span>
            <span>{dayjs(date).format('M')}월</span>
          </div>

          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            type="button"
            className={`
                ${nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                inline-flex p-1 text-sm font-medium text-gray-700 bg-white rounded
              `}
          >
            <FaChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}
      {...rest}
    />
  );
}

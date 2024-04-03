import dayjs from 'dayjs';
import { useState } from 'react';

export default function useYearMonthPicker() {
  const [date, setDate] = useState(new Date());

  const onClickPrev = () => {
    setDate((prev) => dayjs(prev).subtract(1, 'month').toDate());
  };

  const onClickNext = () => {
    setDate((prev) => dayjs(prev).add(1, 'month').toDate());
  };

  return {
    year: dayjs(date).format('YYYY'),
    month: dayjs(date).format('M'),
    yearMonth: dayjs(date).format('YYYY-MM'),
    onClickPrev,
    onClickNext,
  };
}

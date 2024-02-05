'use client';

import ApexCharts from 'react-apexcharts';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'constants/query-keys.constant';
import { dividendsAPI } from 'api/dividends';
import dayjs from 'dayjs';
import YearPicker from 'components/ui/atoms/YearPicker/YearPicker';

export default function DividendsStatistics() {
  const [year, setYear] = useState(dayjs().format('YYYY'));
  const { data } = useQuery(queryKeys.dividends.yaer({ date: year }), () =>
    dividendsAPI.getDividendsYear({
      date: year,
    }),
  );

  const monthData = data?.data?.map(({ total }) => total) || [];

  const onClickPrev = () => {
    setYear(dayjs(year).subtract(1, 'year').format('YYYY'));
  };

  const onClickNext = () => {
    setYear(dayjs(year).add(1, 'year').format('YYYY'));
  };

  return (
    <div>
      <div className="my-2">
        <YearPicker
          year={year}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
        />
      </div>
      <ApexCharts
        type="bar"
        height={300}
        options={{
          chart: {
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top',
              },
            },
          },
          dataLabels: {
            enabled: true,
            formatter(val) {
              return val.toLocaleString() + '원';
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ['#304758'],
            },
          },
          xaxis: {
            categories: [
              '1월',
              '2월',
              '3월',
              '4월',
              '5월',
              '6월',
              '7월',
              '8월',
              '9월',
              '10월',
              '11월',
              '12월',
            ],
            position: 'top',
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                },
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          yaxis: {
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
              formatter(val) {
                return val.toLocaleString() + '원';
              },
            },
          },
          title: {
            text: `${year}년 월별 배당금`,
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
              color: '#444',
            },
          },
        }}
        series={[
          {
            name: '월 배당금',
            data: monthData,
          },
        ]}
      />
    </div>
  );
}

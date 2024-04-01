'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'constants/query-keys.constant';
import { dividendsAPI } from 'api/dividends';
import dayjs from 'dayjs';
import YearPicker from 'components/ui/atoms/YearPicker/YearPicker';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DividendsStatistics() {
  const [year, setYear] = useState(dayjs().format('YYYY'));
  const { data } = useQuery(queryKeys.dividends.yaer({ date: year }), () =>
    dividendsAPI.getDividendsYear({
      date: year,
    }),
  );

  const monthData =
    data?.data?.data.map(
      (arr) =>
        +arr
          .reduce(
            (acc, { dividend, tax, unit }) =>
              acc +
              (unit === 'KRW'
                ? dividend - tax
                : (dividend - tax) * (data.data?.exchangeRate || 0)),
            0,
          )
          .toFixed(),
    ) || [];
  const yearData = monthData.reduce((acc, cur) => acc + cur, 0);

  const onClickPrev = () => {
    setYear(dayjs(year).subtract(1, 'year').format('YYYY'));
  };

  const onClickNext = () => {
    setYear(dayjs(year).add(1, 'year').format('YYYY'));
  };

  return (
    <div>
      <div className="my-2 flex flex-col gap-2">
        <YearPicker
          year={year}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
        />
        {yearData ? (
          <div className="font-bold text-2xl">
            {yearData.toLocaleString()}원
          </div>
        ) : (
          <></>
        )}
      </div>
      <ApexCharts
        type="bar"
        width="100%"
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

      {data?.data?.data.map((arr, index) => (
        <div key={index}>
          {arr.length ? (
            <div className="flex justify-between">
              <div className="font-bold text-xl">{index + 1}월</div>
              <div>{monthData[index].toLocaleString()}원</div>
            </div>
          ) : (
            <></>
          )}
          <div>
            {arr.map(({ id, name, unit, dividend, tax }) => (
              <div key={id}>
                <div className="my-4 flex items-center gap-4">
                  <div className="bg-gray-500 w-8 h-8 rounded-full" />
                  <div>
                    <div className="font-semibold flex gap-1">
                      <div>
                        $
                        {unit === 'USD'
                          ? (dividend - tax).toFixed(2)
                          : (
                              (dividend - tax) /
                              (data.data?.exchangeRate || 0)
                            ).toFixed(2)}
                      </div>
                      <div>
                        (
                        {(unit === 'USD'
                          ? +(
                              (dividend - tax) *
                              (data.data?.exchangeRate || 0)
                            ).toFixed()
                          : dividend - tax
                        ).toLocaleString()}
                        원)
                      </div>
                    </div>
                    <div className="text-sm">{name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { dividendsAPI } from 'src/api/dividends';
import { useState } from 'react';
import { Button } from 'react-daisyui';
import { queryKeys } from 'src/constants/query-keys.constant';
import useYearMonthPicker from 'src/hooks/useYearMonthPicker';
import YearMonthPicker from 'src/components/ui/atoms/YearMonthPicker/YearMonthPicker';
import InfiniteScroll from 'src/components/common/InfiniteScroll';
import TotalCount from 'src/components/ui/atoms/TotalCount/TotalCount';
import Link from 'next/link';
import DividendModal from 'src/components/ui/organisms/modals/dividends/DividendModal';
import DividendList from 'src/components/ui/organisms/dividends/DividendList';

export default function DividendsPage() {
  const { year, month, yearMonth, onClickNext, onClickPrev } =
    useYearMonthPicker();
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    queryKeys.dividends.month({ date: yearMonth }),
    ({ pageParam = 1 }) =>
      dividendsAPI.getDividendsMonth({
        date: yearMonth,
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.meta.isLastPage ? undefined : lastPage.meta.nextPage,
    },
  );

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  return (
    <>
      <div className="mt-10">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <YearMonthPicker
              year={year}
              month={month}
              onClickPrev={onClickPrev}
              onClickNext={onClickNext}
            />
            <Link href="/dividends/statistics">
              <Button>통계</Button>
            </Link>
          </div>

          <div className="flex justify-between items-center">
            <TotalCount totalCount={data?.pages[0].meta.totalCount} />
            <Button onClick={() => setIsOpenCreateModal(true)}>추가</Button>
          </div>

          {isLoading ? (
            <div className="font-semibold text-center text-gray-500 text-lg mt-52">
              불러오는 중...
            </div>
          ) : data?.pages[0].meta.totalCount ? (
            <InfiniteScroll
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
            >
              <DividendList>
                {data?.pages.map((page) =>
                  page.data?.map((dividend) => (
                    <DividendList.Item key={dividend.id} data={dividend} />
                  )),
                )}
              </DividendList>
            </InfiniteScroll>
          ) : (
            <div className="font-semibold text-center text-gray-500 text-lg mt-52">
              검색된 결과가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {/* 배당생성 */}
      <DividendModal
        isOpen={isOpenCreateModal}
        closeModal={() => setIsOpenCreateModal(false)}
      />
    </>
  );
}

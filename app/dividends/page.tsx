'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Unit } from 'api/common/unit.dto';
import { dividendsAPI } from 'api/dividends';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Button, Input, Select } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import Datepicker, { DateRangeType } from 'react-tailwindcss-datepicker';
import useModal from 'hooks/useModal';
import ModalLayout from 'components/ui/templates/ModalLayout';
import { queryKeys } from 'constants/query-keys.constant';
import { GetDividendsResponse } from 'api/dividends/dtos/get-dividends.dto';
import { toast } from 'react-hot-toast';
import useYearMonthPicker from 'hooks/useYearMonthPicker';
import YearMonthPicker from 'components/ui/atoms/YearMonthPicker/YearMonthPicker';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Dividend } from 'api/dividends/entities/dividend.entity';
import InfiniteScroll from 'components/common/InfiniteScroll';
import TotalCount from 'components/ui/atoms/TotalCount/TotalCount';

interface IForm {
  id?: number;
  name: string;
  dividend: string;
  dividendAt: DateRangeType;
  tax: string;
  unit: Unit;
}

export default function DividendsPage() {
  const queryClient = useQueryClient();
  const { year, month, yearMonth, onClickNext, onClickPrev } =
    useYearMonthPicker();
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    queryKeys.dividends({ date: yearMonth }),
    ({ pageParam = 1 }) =>
      dividendsAPI.getDividends({
        date: yearMonth,
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.meta.isLastPage ? undefined : lastPage.meta.nextPage,
    },
  );

  const { register, getValues, watch, setValue, reset } = useForm<IForm>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const { openModal } = useModal();

  const clostModal = () => {
    reset({
      name: '',
      dividend: '',
      dividendAt: {
        startDate: null,
        endDate: null,
      },
      tax: '',
      unit: Unit.KRW,
    });
    setIsOpen(false);
    setIsOpenUpdateModal(false);
  };

  const createDividend = async () => {
    const { dividend, name, tax, unit, dividendAt } = getValues();

    if (!dividendAt?.endDate) {
      throw new Error('배당일을 선택하지 않았습니다.');
    }

    try {
      await dividendsAPI.createDividend({
        name,
        dividend: Number(dividend),
        dividendAt: dayjs(dividendAt.endDate).format('YYYY-MM-DD'),
        ...(tax && { tax: Number(tax) }),
        unit,
      });

      queryClient.invalidateQueries(queryKeys.dividends({ date: yearMonth }));

      toast.success('추가 완료');
      clostModal();
    } catch (error) {
      toast.success('추가 실패');
    }
  };

  const openUpdateModal = (dividend: Dividend) => {
    setValue('id', dividend.id);
    setValue('name', dividend.name);
    setValue('dividendAt', {
      startDate: dayjs(dividend.dividendAt).format('YYYY-MM-DD'),
      endDate: dayjs(dividend.dividendAt).format('YYYY-MM-DD'),
    });
    setValue('dividend', dividend.dividend.toString());
    setValue('tax', (dividend.tax || 0)?.toString());
    setValue('unit', dividend.unit);
    setIsOpenUpdateModal(true);
  };

  const deleteDividend = async () => {
    const id = getValues('id');

    if (!id) {
      throw new Error('id가 존재하지 않습니다.');
    }

    openModal({
      type: 'confirm',
      title: '삭제',
      message: '삭제하시겠습니까?',
      async onOk() {
        try {
          await dividendsAPI.deleteDividend(id);

          queryClient.invalidateQueries(
            queryKeys.dividends({ date: yearMonth }),
          );

          toast.success('삭제 성공');
          clostModal();
        } catch (error) {
          toast.error('삭제 실패');
        }
      },
    });
  };

  const updateDividend = async () => {
    const { id, dividend, dividendAt, name, tax, unit } = getValues();

    if (!id) {
      throw new Error('id가 존재하지 않습니다.');
    }

    openModal({
      type: 'confirm',
      title: '수정',
      message: '수정하시겠습니까?',
      async onOk() {
        try {
          const data = {
            name,
            dividend: Number(dividend),
            dividendAt: dayjs(dividendAt.endDate).format('YYYY-MM-DD'),
            ...(tax && { tax: Number(tax) }),
            unit,
          };
          await dividendsAPI.updateDividend(id, data);

          const prevDividends = queryClient.getQueryData<GetDividendsResponse>(
            queryKeys.dividends({ date: yearMonth }),
          );

          queryClient.setQueryData<GetDividendsResponse>(
            queryKeys.dividends({ date: yearMonth }),
            (prev) => {
              if (prev) {
                return {
                  ...prev,
                  data: prev.data?.map((dividend) =>
                    dividend.id === id
                      ? {
                          ...dividend,
                          ...data,
                          dividendAt: new Date(data.dividendAt),
                        }
                      : dividend,
                  ),
                };
              }
              return prevDividends;
            },
          );

          toast.success('수정 성공');
          clostModal();
        } catch (error) {
          toast.success('수정 실패');
        }
      },
    });
  };

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
            <Button onClick={() => setIsOpen(true)}>추가</Button>
          </div>

          <TotalCount totalCount={data?.pages[0].meta.totalCount} />

          {isLoading ? (
            <div className="font-semibold text-center text-gray-500 text-lg mt-52">
              불러오는 중...
            </div>
          ) : data?.pages[0].meta.totalCount ? (
            <InfiniteScroll
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
            >
              <ul className="min-h-[700px]">
                {data?.pages.map((page) =>
                  page.data?.map((dividend) => (
                    <li key={dividend.id} className="py-2">
                      <button
                        className="w-full flex justify-between items-center border p-3 rounded-lg"
                        onClick={() => openUpdateModal(dividend)}
                      >
                        <div className="flex-1 text-left text-sm">
                          {dayjs(dividend.dividendAt).format('YYYY-MM-DD')}
                        </div>
                        <div className="flex-1 font-semibold">
                          {dividend.name}
                        </div>
                        <div className="flex-1 text-right">
                          {`${(
                            dividend.dividend - (dividend.tax || 0)
                          ).toLocaleString()}`}
                          <span className="text-xs ml-1 font-semibold">
                            {dividend.unit}
                          </span>
                        </div>
                      </button>
                    </li>
                  )),
                )}
              </ul>
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
      <ModalLayout
        title="배당"
        isOpen={isOpen || isOpenUpdateModal}
        actions={
          <div className="w-full flex justify-between">
            {isOpenUpdateModal ? (
              <Button onClick={deleteDividend}>
                <FaRegTrashCan />
              </Button>
            ) : (
              <div></div>
            )}
            <div className="flex gap-2">
              <Button onClick={clostModal}>닫기</Button>
              {isOpenUpdateModal ? (
                <Button onClick={updateDividend}>수정</Button>
              ) : (
                <Button onClick={createDividend}>추가</Button>
              )}
            </div>
          </div>
        }
      >
        <div className="divide-y-2">
          <div className="flex gap-2 py-4 items-center">
            <div className="w-16">종목</div>
            <Input {...register('name')} size="md" className="w-full" />
          </div>
          <div className="flex gap-2 py-4 items-center">
            <div className="w-16">날짜</div>
            <div className="w-full">
              <Datepicker
                i18n={'ko'}
                asSingle
                useRange={false}
                value={watch('dividendAt') || ''}
                onChange={(newValue) => {
                  if (newValue) {
                    setValue('dividendAt', newValue);
                  }
                }}
                inputClassName="w-full input input-md input-bordered focus:outline-offset-0"
              />
            </div>
          </div>
          <div className="py-4">
            <div className="flex gap-2 items-center">
              <div className="w-16">통화</div>
              <Select {...register('unit')} size="md" className="w-full">
                <Select.Option value={'KRW'} selected>
                  KRW
                </Select.Option>
                <Select.Option value={'USD'}>USD</Select.Option>
              </Select>
            </div>
          </div>
          <div className="py-4">
            <div className="flex gap-2 items-center">
              <div className="w-16">배당</div>
              <Input {...register('dividend')} size="md" className="w-full" />
            </div>
          </div>
          <div className="py-4">
            <div className="flex gap-2 items-center">
              <div className="w-16">세금</div>
              <Input {...register('tax')} size="md" className="w-full" />
            </div>
          </div>
          <div className="py-4">
            <div className="flex gap-2 items-center">
              <div className="w-16">실수령</div>
              <Input
                size="md"
                className="w-full"
                value={+watch('dividend') - (+watch('tax') || 0)}
                disabled
              />
            </div>
          </div>
        </div>
      </ModalLayout>
    </>
  );
}

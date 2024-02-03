'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Unit } from 'api/common/unit.dto';
import { dividendsAPI } from 'api/dividends';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Button, Input, Modal, Select } from 'react-daisyui';
import { useForm, Controller } from 'react-hook-form';
import useModal from 'hooks/useModal';
import ModalLayout from 'components/ui/templates/ModalLayout';
import { queryKeys } from 'constants/query-keys.constant';
import { toast } from 'react-hot-toast';
import useYearMonthPicker from 'hooks/useYearMonthPicker';
import YearMonthPicker from 'components/ui/atoms/YearMonthPicker/YearMonthPicker';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Dividend } from 'api/dividends/entities/dividend.entity';
import InfiniteScroll from 'components/common/InfiniteScroll';
import TotalCount from 'components/ui/atoms/TotalCount/TotalCount';
import TextAlert from 'components/ui/atoms/TextAlert/TextAlert';
import DatePicker from 'components/ui/organisms/DatePicker';

interface IForm {
  id?: number;
  name: string;
  dividend: string;
  dividendAt: Date | null;
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

  const {
    register,
    getValues,
    watch,
    setValue,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForm>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const { openModal } = useModal();

  const clostModal = () => {
    reset({
      name: '',
      dividend: '',
      dividendAt: null,
      tax: '',
      unit: Unit.KRW,
    });
    setIsOpen(false);
    setIsOpenUpdateModal(false);
  };

  const createDividend = async () => {
    const { dividend, name, tax, unit, dividendAt } = getValues();

    try {
      await dividendsAPI.createDividend({
        name,
        dividend: Number(dividend),
        dividendAt: dayjs(dividendAt).format('YYYY-MM-DD'),
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
    setValue('dividendAt', dayjs(dividend.dividendAt).toDate());
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
            dividendAt: dayjs(dividendAt).format('YYYY-MM-DD'),
            ...(tax && { tax: Number(tax) }),
            unit,
          };
          await dividendsAPI.updateDividend(id, data);

          queryClient.invalidateQueries(
            queryKeys.dividends({ date: yearMonth }),
          );

          toast.success('수정 성공');
          clostModal();
        } catch (error) {
          toast.success('수정 실패');
        }
      },
    });
  };

  const onValid = () => {
    if (isOpenUpdateModal) {
      updateDividend();
      return;
    }

    createDividend();
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
      <form onSubmit={handleSubmit(onValid)}>
        <ModalLayout title="배당" isOpen={isOpen || isOpenUpdateModal}>
          <Modal.Body className="divide-y-2">
            <div className="flex gap-2 py-4 items-center">
              <div className="w-16">종목</div>
              <div className="w-full">
                <Input
                  {...register('name', {
                    required: '종목을 입력해주세요.',
                  })}
                  size="md"
                  className="w-full"
                />
                <TextAlert
                  message={errors.name?.message}
                  className="ms-2 mt-2"
                />
              </div>
            </div>
            <div className="flex gap-2 py-4 items-center">
              <div className="w-16">날짜</div>
              <div className="w-full">
                <div className="w-full">
                  <Controller
                    name="dividendAt"
                    control={control}
                    rules={{ required: '배당일을 선택해 주세요.' }}
                    render={({ field: { name, value, onChange, onBlur } }) => (
                      <DatePicker
                        name={name}
                        selected={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="w-full"
                        wrapperClassName="w-full"
                        autoComplete="off"
                        customInput={<Input size="md" className="w-full" />}
                      />
                    )}
                  />
                </div>
                <TextAlert
                  message={errors.dividendAt?.message}
                  className="ms-2 mt-3"
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
                <div className="w-full">
                  <Input
                    {...register('dividend', {
                      required: '배당을 입력해주세요.',
                    })}
                    type="number"
                    size="md"
                    className="w-full"
                  />
                  <TextAlert
                    message={errors.dividend?.message}
                    className="ms-2 mt-3"
                  />
                </div>
              </div>
            </div>
            <div className="py-4">
              <div className="flex gap-2 items-center">
                <div className="w-16">세금</div>
                <Input
                  {...register('tax')}
                  type="number"
                  size="md"
                  className="w-full"
                />
              </div>
            </div>
            <div className="py-4">
              <div className="flex gap-2 items-center">
                <div className="w-16">실수령</div>
                <Input
                  size="md"
                  className="w-full"
                  value={(
                    +watch('dividend') - (+watch('tax') || 0)
                  ).toLocaleString()}
                  disabled
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Actions>
            <div className="w-full flex justify-between">
              {isOpenUpdateModal ? (
                <Button onClick={deleteDividend}>
                  <FaRegTrashCan />
                </Button>
              ) : (
                <div></div>
              )}
              <div className="flex gap-2">
                <Button type="button" onClick={clostModal}>
                  닫기
                </Button>
                {isOpenUpdateModal ? (
                  <Button type="submit">수정</Button>
                ) : (
                  <Button type="submit">추가</Button>
                )}
              </div>
            </div>
          </Modal.Actions>
        </ModalLayout>
      </form>
    </>
  );
}

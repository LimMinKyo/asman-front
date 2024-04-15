import { Button, Input, InputProps, Modal, Select } from 'react-daisyui';
import TextAlert from 'src/components/ui/atoms/TextAlert/TextAlert';
import ModalLayout from 'src/components/ui/templates/ModalLayout';
import DatePicker from '../../DatePicker';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'src/constants/query-keys.constant';
import { dividendsAPI } from 'src/api/dividends';
import useModal from 'src/hooks/useModal';
import { forwardRef } from 'react';
import { Unit } from 'src/api/common/unit.dto';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Dividend } from 'src/api/dividends/entities/dividend.entity';

interface IForm {
  id?: number;
  name: string;
  dividend: string;
  dividendAt: Date;
  tax: string;
  unit: Unit;
}

const NumberFormat = forwardRef(
  (props: NumericFormatProps<InputProps>, ref) => {
    return <NumericFormat {...props} getInputRef={ref} />;
  },
);

NumberFormat.displayName = 'NumberFormat';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  defaultValues?: Dividend;
}

export default function DividendModal({
  isOpen,
  closeModal,
  defaultValues,
}: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    getValues,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          dividendAt: dayjs(defaultValues.dividendAt).toDate(),
          dividend: defaultValues.dividend.toString(),
          tax: defaultValues.tax.toString(),
        }
      : {
          dividendAt: new Date(),
          dividend: '',
          tax: '',
        },
  });
  const { openModal } = useModal();

  const createDividend = async () => {
    const { dividend, name, tax, unit, dividendAt } = getValues();

    try {
      await dividendsAPI.createDividend({
        name,
        dividend: Number(dividend.replaceAll(',', '')),
        dividendAt: dayjs(dividendAt).format('YYYY-MM-DD'),
        tax: Number(tax.replaceAll(',', '')),
        unit,
      });

      queryClient.invalidateQueries(queryKeys.dividends.all);

      toast.success('추가 완료');
      closeModal();
    } catch (error) {
      toast.success('추가 실패');
    }
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

          queryClient.invalidateQueries(queryKeys.dividends.all);

          toast.success('삭제 성공');
          closeModal();
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
            dividend: Number(dividend.replaceAll(',', '')),
            dividendAt: dayjs(dividendAt).format('YYYY-MM-DD'),
            tax: Number(tax.replaceAll(',', '')),
            unit,
          };
          await dividendsAPI.updateDividend(id, data);

          queryClient.invalidateQueries(queryKeys.dividends.all);

          toast.success('수정 성공');
          closeModal();
        } catch (error) {
          toast.success('수정 실패');
        }
      },
    });
  };

  const onValid = () => {
    if (getValues('id')) {
      updateDividend();
      return;
    }

    createDividend();
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <ModalLayout title="배당" isOpen={isOpen}>
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
              <TextAlert message={errors.name?.message} className="ms-2 mt-2" />
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
              <Select
                {...register('unit')}
                defaultValue={'KRW'}
                size="md"
                className="w-full"
              >
                <Select.Option value={'KRW'}>KRW</Select.Option>
                <Select.Option value={'USD'}>USD</Select.Option>
              </Select>
            </div>
          </div>
          <div className="py-4">
            <div className="flex gap-2 items-center">
              <div className="w-16">배당</div>
              <div className="w-full">
                <NumberFormat
                  {...register('dividend', {
                    required: '배당을 입력해주세요.',
                  })}
                  defaultValue={defaultValues?.dividend}
                  thousandSeparator
                  allowNegative={false}
                  decimalScale={watch('unit') === Unit.USD ? 4 : 0}
                  size="md"
                  className="w-full"
                  customInput={Input}
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
              <NumberFormat
                {...register('tax')}
                defaultValue={defaultValues?.tax}
                thousandSeparator
                allowNegative={false}
                decimalScale={watch('unit') === Unit.USD ? 4 : 0}
                size="md"
                className="w-full"
                customInput={Input}
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
                  +watch('dividend').replaceAll(',', '') -
                  +watch('tax').replaceAll(',', '')
                ).toLocaleString()}
                disabled
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <div className="w-full flex justify-between">
            {defaultValues ? (
              <Button type="button" onClick={deleteDividend}>
                <FaRegTrashCan />
              </Button>
            ) : (
              <div></div>
            )}
            <div className="flex gap-2">
              <Button type="button" onClick={closeModal}>
                닫기
              </Button>
              {defaultValues ? (
                <Button type="submit">수정</Button>
              ) : (
                <Button type="submit">추가</Button>
              )}
            </div>
          </div>
        </Modal.Actions>
      </ModalLayout>
    </form>
  );
}

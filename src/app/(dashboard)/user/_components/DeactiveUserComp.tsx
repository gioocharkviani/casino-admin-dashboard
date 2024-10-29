'use client';
import React from 'react';
import useModalStore from '@/store/useModalStore';
import { Button, Checkbox, Input } from '@/components/ui';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { deactiveUser } from '@/services';
import useTableStore from '@/store/useTableStore';

type Inputs = {
  userId: string | number;
  reason: string;
  balanceIsChecked: boolean;
};

const DeactiveUserComp = ({ id }: any) => {
  const { setClose } = useModalStore();
  const { setRefetch } = useTableStore();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      userId: id,
      reason: '',
      balanceIsChecked: false,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    toast.promise(
      deactiveUser({ data }).then(async (response) => {
        if (response.ok) {
          setClose();
          setRefetch();
          reset();
        } else {
          const resJson = await response.json();
          throw new Error(resJson);
        }
      }),
      {
        pending: 'pending Deactivate...',
        success: 'user Deactivate successfully! 👌',
        error: 'Failed to Deavtivate User. 🤯',
      }
    );
  };

  return (
    <div
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-cente  gap-3"
    >
      <form className="flex flex-col justify-cente  gap-3">
        <Controller
          name="reason"
          control={control}
          rules={{ required: 'Reason is required' }}
          render={({ field }) => (
            <Input
              error={errors.reason?.message}
              label="reasons"
              type="text"
              {...field}
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value || null)}
            />
          )}
        />
        <div className="flex gap-2 items-center">
          <span className="block text-sm font-medium mb-1 transition-all">
            balance Is Checked
          </span>
          <Controller
            name="balanceIsChecked"
            control={control}
            render={({ field }) => (
              <Checkbox
                id={field.name}
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>
        <Button type="submit">deactive user</Button>
      </form>
    </div>
  );
};

export default DeactiveUserComp;

'use client';
import React from 'react';
import useModalStore from '@/store/useModalStore';
import { Button, Checkbox, Input } from '@/components/ui';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { boolean } from 'zod';
import { toast } from 'react-toastify';
import { deactiveUser } from '@/services';

type Inputs = {
  userId: string | number;
  reason: string;
  balanceIsChecked: boolean;
};

const DeactiveUser = ({ id }: any) => {
  const { setClose } = useModalStore();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
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
      (async () => {
        const response = await deactiveUser({ data });
        if (response.statusCode === 200 || response.statusCode === 'OK') {
          setClose();
          reset();
        } else {
          throw new Error(response.message);
        }
      })(),
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
              label="title"
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

export default DeactiveUser;

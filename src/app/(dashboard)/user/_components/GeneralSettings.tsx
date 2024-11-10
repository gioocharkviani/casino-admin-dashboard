'use client';
import React from 'react';
import useModalStore from '@/store/useModalStore';
import { Button, Checkbox, Input, Select } from '@/components/ui';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { deactiveUser } from '@/services';
import useTableStore from '@/store/useTableStore';

type Inputs = {
  userId: string | number;
  reason: string;
  balanceIsChecked: boolean;
};

const GeneralSettings = ({ id }: any) => {
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

  const options = {};

  return (
    <div
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-cente  gap-3"
    >
      <div className="min-h-[200px] px-[4px]">
        <h2>level change</h2>
        <Select
          onChange={() => {}}
          options={[]}
          defaultValue={''}
          name="sdsd"
        />
      </div>
      <div className="px-[4px]">
        <h2>change Role</h2>
        <Select
          onChange={() => {}}
          options={[]}
          defaultValue={''}
          name="sdsd"
        />
      </div>
    </div>
  );
};

export default GeneralSettings;

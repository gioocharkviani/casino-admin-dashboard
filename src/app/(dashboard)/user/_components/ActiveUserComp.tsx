'use client';
import React from 'react';
import useModalStore from '@/store/useModalStore';
import { Button } from '@/components/ui';
import { toast } from 'react-toastify';
import { avtiveUser } from '@/services';
import useTableStore from '@/store/useTableStore';

const ActiveUserComp = ({ id }: { id: number }) => {
  const { setClose } = useModalStore();
  const { setRefetch } = useTableStore();

  const onSubmit = async () => {
    toast.promise(
      avtiveUser(id).then(async (response) => {
        if (response.ok) {
          setClose();
          setRefetch();
        } else {
          const resJson = await response.json();
          throw new Error(resJson);
        }
      }),
      {
        pending: 'Activating user...',
        success: 'User activated successfully! 👌',
        error: {
          render({ data }: any) {
            return data?.message || 'Failed to activate user. 🤯';
          },
        },
      }
    );
  };

  return (
    <div className="flex flex-col justify-center gap-3">
      <Button type="button" onClick={onSubmit}>
        Activate User
      </Button>
    </div>
  );
};

export default ActiveUserComp;

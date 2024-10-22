'use client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import useModalStore from '@/store/useModalStore';
import useSelectorStore from '@/store/useSelectorStore';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { handleGetAuthCookie } from '@/utils/cookies';
import { api } from '@/config';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

type Inputs = {
  title: string;
  recipientIds: number | string[];
  content: string;
  trigerAt: string | null;
  category: string | number;
};

const EditNotifi = () => {
  const searchparams = useSearchParams();

  const { setOpen, setChildren, setTitle } = useModalStore();
  const { selectedItem, addSelectedItem, resetSelectedItems } =
    useSelectorStore();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
      recipientIds: [],
      content: '',
      trigerAt: null,
      category: '',
    },
  });

  // Function to preview notification in modal
  const notificationPreview = (data: any) => {
    const htmlContent = data;
    setChildren(<div dangerouslySetInnerHTML={{ __html: htmlContent }} />);
    setTitle('Notification preview');
    setOpen();
  };

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_NEST_API_URL;
    const editData = async () => {
      try {
        const token = await handleGetAuthCookie();
        const notifyId = searchparams.get('id');
        const response = await api({
          url: `${backendUrl}/notification/${notifyId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setValue('title', response.data.title);
        setValue('category', response.data?.category);
        setValue('content', response.data?.content);
        setValue('recipientIds', response.data?.recipientId);
        setValue('trigerAt', response.data?.trigerAt);
      } catch (error) {}
    };
    editData();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_NEST_API_URL;
    const token = await handleGetAuthCookie();
    const notifyId = searchparams.get('id');
    toast.promise(
      (async () => {
        const response = await api({
          url: `${backendUrl}/notification/${notifyId}`,
          method: 'PATCH',
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.statusCode === 200) {
          return 'Notification edit successfully!';
        } else {
          throw new Error(response.message);
        }
      })(),
      {
        pending: 'editing notification...',
        success: 'Notification edit successfully! 👌',
        error: 'Failed to edit notification. 🤯',
      }
    );
  };

  const formatDateTimeLocal = (date: string | null) => {
    if (!date) return '';
    const dt = new Date(date);
    return dt.toISOString().slice(0, 16);
  };

  // Dropdown options
  const options = [
    { value: 'NOTIFI', label: 'Notifi' },
    { value: 'POPUP', label: 'Popup' },
  ];

  return (
    <div className="w-full">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                error={errors.title?.message}
                label="title"
                type="text"
                {...field}
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value || null)}
              />
            )}
          />
        </div>
        <div className="flex gap-5 justify-center items-center flex-col md:flex-row">
          <Controller
            name="category"
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <Select
                label="Select an Option"
                name="category"
                options={options}
                defaultValue={field.value}
                placeholder="Select an option"
                error={errors.category?.message}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </div>

        {/* Textarea for the content */}
        <div>
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Content is required' }}
            render={({ field }) => (
              <Textarea
                error={errors.content?.message}
                label="Content"
                {...field}
              />
            )}
          />
        </div>

        {/* Preview button */}
        <div className="w-max">
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <Button
                icon={FaEye}
                type="button"
                onClick={() => notificationPreview(field.value)}
              >
                Preview
              </Button>
            )}
          />
        </div>

        {/* Date input for the trigger */}
        <div>
          <Controller
            name="trigerAt"
            control={control}
            render={({ field }) => (
              <Input
                error={errors.trigerAt?.message}
                label="Trigger Date"
                type="datetime-local"
                {...field}
                value={field.value ? formatDateTimeLocal(field.value) : ''}
                onChange={(e) => field.onChange(e.target.value || null)}
              />
            )}
          />
        </div>

        {/* Create Notification button */}
        <div>
          <Button type="submit">Edit</Button>
        </div>
      </form>
    </div>
  );
};

export default EditNotifi;

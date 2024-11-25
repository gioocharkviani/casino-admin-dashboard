"use client";
import React from "react";
import useModalStore from "@/store/useModalStore";
import { Button, Input } from "@/components/ui";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { userToBlacklist } from "@/services";

type Inputs = {
  user_id: string | number;
  reason: string;
};

const BlackListAddComp = ({ id }: any) => {
  const { setClose } = useModalStore();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      user_id: id,
      reason: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    toast.promise(
      userToBlacklist({ data }).then(async response => {
        if (response.ok) {
          setClose();
          reset();
        } else {
          const resJson = await response.json();
          throw new Error(resJson);
        }
      }),
      {
        pending: "Adding to blacklist...",
        success: "User added to blacklist successfully! 👌",
        error: "Failed to add user. 🤯",
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex min-w-[40vw] flex-col justify-center gap-3">
      <Controller
        name="reason"
        control={control}
        rules={{ required: "Reason is required" }}
        render={({ field }) => (
          <Input
            error={errors.reason?.message}
            label="Reason"
            type="text"
            {...field}
            onChange={e => field.onChange(e.target.value)}
          />
        )}
      />

      <Button type="submit">Add to Blacklist</Button>
    </form>
  );
};

export default BlackListAddComp;

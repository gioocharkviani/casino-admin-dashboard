"use client";
import React, { useState } from "react";
import useModalStore from "@/store/useModalStore";
import { Button, Select } from "@/components/ui";
import { toast } from "react-toastify";

import useRefetchStore from "@/store/useRefetchStore";
import { changeTransactionStatus } from "@/services";

const EditTransactionStatus = ({ id }: { id?: any }) => {
  const { setClose } = useModalStore();
  const { setRefetch } = useRefetchStore(state => state);

  const [value, setValue] = useState<string | number>("");

  const selectData = [
    {
      id: 1,
      label: "pending",
      value: "pending",
    },
    {
      id: 2,
      label: "completed",
      value: "completed",
    },
    {
      id: 3,
      label: "cancelled",
      value: "cancelled",
    },
    {
      id: 4,
      label: "failed",
      value: "failed",
    },
  ];

  const onSubmit = async () => {
    toast.promise(
      changeTransactionStatus(id, value).then(async (response: any) => {
        if (response.ok) {
          setRefetch();
          setClose();
        } else {
          const resJson = await response.json();

          throw new Error(resJson.message);
        }
      }),
      {
        pending: "updating status...",
        success: "transaction status updated successfully! 👌",
        error: {
          render({ data }: any) {
            return data.message || "Something whent wrong";
          },
        },
      },
    );
  };

  return (
    <div className="flex flex-col justify-between gap-3 min-h-[290px] p-2 min-w-[40vw]">
      <Select
        onChange={setValue}
        key="2"
        name="Select_Status"
        resetSelect
        label="Select Status"
        options={selectData}
        defaultValue=""
        placeholder="Select Status"
      />
      <Button type="button" onClick={onSubmit} disable={value ? true : false}>
        Change Status
      </Button>
    </div>
  );
};

export default EditTransactionStatus;

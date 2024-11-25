"use client";
import React, { useRef } from "react";
import useModalStore from "@/store/useModalStore";
import { Button } from "@/components/ui";
import { toast } from "react-toastify";
import { avtiveUser } from "@/services";
import useRefetchStore from "@/store/useRefetchStore";

const ActiveUserComp = ({ id }: { id: number }) => {
  const { setClose } = useModalStore();
  const { setRefetch } = useRefetchStore();

  const onSubmit = async () => {
    toast.promise(
      avtiveUser(id).then(async response => {
        if (response.ok) {
          setRefetch();
          setClose();
        } else {
          const resJson = await response.json();
          throw new Error(resJson);
        }
      }),
      {
        pending: "Activating user...",
        success: "User activated successfully! 👌",
        error: {
          render({ data }: any) {
            return data?.message || "Failed to activate user. 🤯";
          },
        },
      },
    );
  };

  return (
    <div className="flex flex-col justify-center gap-3 min-w-[40vw]">
      <Button type="button" onClick={onSubmit}>
        Activate User
      </Button>
    </div>
  );
};

export default ActiveUserComp;

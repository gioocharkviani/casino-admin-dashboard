"use client";
import { Button } from "@/components/ui";
import React from "react";
import useModalStore from "@/store/useModalStore";
import { toast } from "react-toastify";
import { removeNotificatiopn } from "@/services";
import useRefetchStore from "@/store/useRefetchStore";

const DeleteNotifi = ({ id }: any) => {
  const { setClose } = useModalStore();
  const { setRefetch } = useRefetchStore(state => state);

  const onSubmit = async () => {
    toast.promise(
      (async () => {
        removeNotificatiopn(id).then(async res => {
          console.log(res);
          if (res.statusText === "OK") {
            setClose();
            setRefetch();
          } else {
            const resJson = await res.json();
            throw new Error(resJson);
          }
        });
      })(),
      {
        pending: "remove notification...",
        success: "Notification remove successfully! 👌",
        error: "Failed to remove notification. 🤯",
      },
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 ">
      <h2 className="font-bold uppercase">Are you shure</h2>
      <div className="flex gap-3 w-full">
        <Button type="button" onClick={() => setClose()} bgColor="gray">
          no
        </Button>
        <Button type="button" onClick={() => onSubmit()}>
          yes
        </Button>
      </div>
    </div>
  );
};

export default DeleteNotifi;

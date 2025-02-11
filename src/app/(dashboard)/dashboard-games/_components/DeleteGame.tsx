"use client";
import React from "react";
import useModalStore from "@/store/useModalStore";
import { Button } from "@/components/ui";
import { toast } from "react-toastify";
import { avtiveUser, removeDashboardGame } from "@/services";
import useRefetchStore from "@/store/useRefetchStore";

const DeleteGame = ({ id }: { id: number }) => {
  const { setClose } = useModalStore();
  const { setRefetch } = useRefetchStore(state => state);

  const onSubmit = async () => {
    toast.promise(
      removeDashboardGame(id).then(async (response: any) => {
        if (response.ok) {
          setRefetch();
          setClose();
        } else {
          const resJson = await response.json();
          throw new Error(resJson);
        }
      }),
      {
        pending: "Removing game...",
        success: "game removed successfully! 👌",
        error: "Failed to remove gamea. 🤯",
      },
    );
  };

  return (
    <div className="flex flex-col justify-center gap-3 min-w-[40vw]">
      <Button type="button" onClick={onSubmit}>
        Delete game
      </Button>
    </div>
  );
};

export default DeleteGame;

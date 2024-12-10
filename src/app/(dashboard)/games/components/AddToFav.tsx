"use client";
import React from "react";
import useModalStore from "@/store/useModalStore";
import { Button } from "@/components/ui";
import { toast } from "react-toastify";
import { addToFav } from "@/services";
import useRefetchStore from "@/store/useRefetchStore";
import { error } from "console";

const AddToFav = (gameId: number | string) => {
  const { setClose } = useModalStore();
  const { setRefetch } = useRefetchStore();

  const onSubmit = async () => {
    toast.promise(
      addToFav(gameId).then(async response => {
        console.log(response);
        if (response.ok) {
          setRefetch();
          setClose();
        } else {
          const resJson = await response.json();
          throw new Error(resJson);
        }
      }),
      {
        pending: "Waiting for response...",
        success: "Game added to favorites successfully! 👌",
        error: "Failed to add game to favorites. 🤯",
      },
    );
  };

  return (
    <div className="flex flex-col justify-center gap-3 min-w-[40vw]">
      <Button type="button" onClick={onSubmit}>
        Add to favorite
      </Button>
    </div>
  );
};

export default AddToFav;

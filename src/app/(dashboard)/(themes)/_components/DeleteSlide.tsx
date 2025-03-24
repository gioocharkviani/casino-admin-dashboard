"use client";
import React from "react";
import useModalStore from "@/store/useModalStore";
import { Button } from "@/components/ui";
import { toast } from "react-toastify";
import { removeDashboardGame } from "@/services";
import useRefetchStore from "@/store/useRefetchStore";
import { removeSlide } from "@/services/swiper.service";

const DeleteSlide = ({ id }: { id: number }) => {
  const { setClose } = useModalStore();
  const { setRefetch } = useRefetchStore(state => state);

  const onSubmit = async () => {
    toast.promise(
      removeSlide(id).then(async (response: any) => {
        if (response.ok) {
          setRefetch();
          setClose();
        } else {
          const resJson = await response.json();
          throw new Error(resJson);
        }
      }),
      {
        pending: "Removing Slide...",
        success: "Slide removed successfully! 👌",
        error: "Failed to remove Slide. 🤯",
      },
    );
  };

  return (
    <div className="flex flex-col justify-center gap-3 min-w-[40vw]">
      <Button type="button" onClick={onSubmit}>
        Delete Slide
      </Button>
    </div>
  );
};

export default DeleteSlide;

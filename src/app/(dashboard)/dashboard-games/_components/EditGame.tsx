"use client";
import React, { useState } from "react";
import useModalStore from "@/store/useModalStore";
import { Button, Select } from "@/components/ui";
import { toast } from "react-toastify";
import { updateGamesByCategories } from "@/services";
import useRefetchStore from "@/store/useRefetchStore";
import { updateGameType } from "@/types";

const UpdateGame = ({ id }: { id: any }) => {
  const { setClose } = useModalStore();
  const { setRefetch } = useRefetchStore(state => state);

  const [value, setValue] = useState<string | number>("");

  const data: updateGameType = {
    game_id: id.id,
    new_category_type: value,
  };

  const selectData = [
    {
      id: 2,
      label: "top",
      value: "top",
    },
    {
      id: 2,
      label: "new",
      value: "new",
    },
    {
      id: 3,
      label: "ranking",
      value: "ranking",
    },
  ];

  const onSubmit = async () => {
    toast.promise(
      updateGamesByCategories(data).then(async (response: any) => {
        if (response.ok) {
          setRefetch();
          setClose();
        } else {
          const resJson = await response.json();
          throw new Error(resJson);
        }
      }),
      {
        pending: "updating game...",
        success: "game updated successfully! 👌",
        error: "Failed to update game. 🤯",
      },
    );
  };

  return (
    <div className="flex flex-col justify-between gap-3 min-h-[290px] p-2 min-w-[40vw]">
      <Select
        onChange={setValue}
        key="2"
        name="Select_categorie"
        resetSelect
        label="Select categories"
        options={selectData}
        defaultValue=""
        placeholder="Select categories"
      />
      <Button type="button" onClick={onSubmit} disable={value ? true : false}>
        Add game
      </Button>
    </div>
  );
};

export default UpdateGame;

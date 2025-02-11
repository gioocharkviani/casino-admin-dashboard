"use client";
import React, { useState } from "react";
import useModalStore from "@/store/useModalStore";
import { Button, Input } from "@/components/ui";
import { toast } from "react-toastify";
import { addGamesByCategories, avtiveUser, removeDashboardGame } from "@/services";
import useRefetchStore from "@/store/useRefetchStore";

const AddGameComp = ({ id }: { id: string }) => {
  const { setClose } = useModalStore();
  const { setRefetch } = useRefetchStore(state => state);

  const [data, setData] = useState({
    game_id: "" as string | number,
    category_type: id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prevData => ({
      ...prevData,
      game_id: parseInt(e.target.value),
    }));
  };

  const onSubmit = async () => {
    toast.promise(
      addGamesByCategories(data).then(async (response: any) => {
        if (response.ok) {
          setRefetch();
          setClose();
        } else {
          const resJson = await response.json();
          throw new Error(resJson);
        }
      }),
      {
        pending: "adding game...",
        success: "game added successfully! 👌",
        error: "Failed to add game. 🤯",
      },
    );
  };

  return (
    <div className="flex flex-col justify-center gap-3 min-w-[40vw]">
      <Input label="Insert Game Id" type="number" onChange={handleChange} value={data.game_id} />
      <Button type="button" onClick={onSubmit} disable={data.game_id ? true : false}>
        Add game
      </Button>
    </div>
  );
};

export default AddGameComp;

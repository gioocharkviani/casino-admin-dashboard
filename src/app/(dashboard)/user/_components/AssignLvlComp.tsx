"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useModalStore from "@/store/useModalStore";
import { Button, Select } from "@/components/ui";
import { toast } from "react-toastify";
import { assignLevel, getUserLevel } from "@/services";

const AssignLvlComp = ({ id }: any) => {
  const { setClose } = useModalStore();

  const searchParams = useSearchParams();
  const [data, setData] = useState<{ label: string; value: number }[]>([]);
  const [value, setValue] = useState<string | number>("");
  const [meta, setMeta] = useState();

  // Query params
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const perPage = searchParams.get("per_page") || 10;
  const sortBy = searchParams.get("sort_by") || "";
  const sortDirection = searchParams.get("sort_direction") || "";

  useEffect(() => {
    const fetchFunc = async () => {
      const endpoint = `?page=${page}&per_page=${perPage}&sort_by=${sortBy}&sort_direction=${sortDirection}&search=${search}`;
      try {
        const res = await getUserLevel(endpoint);
        const newData = res.data.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
        setData(newData);
        setMeta(res.meta);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFunc();
  }, [page, search, perPage, sortBy, sortDirection]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!value) {
      toast.error("Please select a level before submitting.");
      return;
    }

    const endpoint = `/admin/levels/assign-level?user_id=${id}&level_id=${value}`;

    toast.promise(
      assignLevel(endpoint).then(async (response: any) => {
        if (response.ok) {
          setClose();
        } else {
          const resJson = await response.json();
          throw new Error(resJson);
        }
      }),
      {
        pending: "Assigning level...",
        success: "Level assigned successfully! 👌",
        error: "Failed to assign level 🤯",
      },
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex min-w-[40vw] flex-col gap-3 px-2 min-h-[30vh]">
      <Select
        onChange={setValue}
        key="1"
        name="select_lvl"
        resetSelect
        label="Select Level"
        options={data}
        defaultValue=""
        placeholder="Select level"
      />
      <Button type="submit">Assign Level</Button>
    </form>
  );
};

export default AssignLvlComp;

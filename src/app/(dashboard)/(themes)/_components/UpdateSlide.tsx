"use client";
import React, { useState } from "react";
import useModalStore from "@/store/useModalStore";
import { Button, Checkbox, Input } from "@/components/ui";
import { toast } from "react-toastify";

import useRefetchStore from "@/store/useRefetchStore";
import { updateSlide } from "@/services/swiper.service";

const UpdateSlide = ({ id, data }: { id: number; data?: any }) => {
  const { setClose } = useModalStore();
  const { setRefetch } = useRefetchStore(state => state);

  const [published, setPublished] = useState<boolean>(data.published);
  const [Link, setLink] = useState<string>(data.link);

  const onSubmit = async () => {
    const body = {
      img: data.img,
      link: Link,
      published: published,
    };
    toast.promise(
      updateSlide(id, body).then(async (response: any) => {
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
        success: "Slide status updated successfully! 👌",
        error: {
          render({ data }: any) {
            return data.message || "Something whent wrong";
          },
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-3 h-auto p-2 min-w-[40vw]">
      <div className="flex flex-col gap-2">
        <span className="text-[13] font-[300] text-gray-600">published</span>
        <Checkbox checked={published} onChange={() => setPublished(!published)} id="pb" />
      </div>
      <Input type="text" label="link" value={Link} onChange={e => setLink(e.target.value)} />
      <Button type="button" onClick={onSubmit}>
        Change Status
      </Button>
    </div>
  );
};

export default UpdateSlide;

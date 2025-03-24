"use client";
import Table from "@/components/tables/Table";
import { TableOptions } from "@/components/tables/tableOptions.types";
import React, { useEffect, useState } from "react";

import { IoIosRemoveCircleOutline } from "react-icons/io";
import DeleteSlide from "./DeleteSlide";
import UpdateSlide from "./UpdateSlide";
import UploadForm from "./UploadForm";
import { getAllSwiperData } from "@/services/swiper.service";
import useRefetchStore from "@/store/useRefetchStore";

const SlideList = () => {
  const { refetch, setRefetch } = useRefetchStore(state => state);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllSwiperData();
        setData(res);
        return res;
      } catch (error) {
        return error;
      }
    };
    getData();
  }, [refetch]);
  const tableOptions: TableOptions = {
    search: false,
    select: false,
    rowUniqueKey: {
      key: "game",
      value: "id",
    },
    image: {
      active: true,
      inObjectKey: "",
      imageDataKey: "img",
    },
    saveData: false,
    pagination: false,
    sort: false,
    settings: {
      title: "SlideList",
      active: false,
    },
    create: {
      active: true,
      link: "",
      type: "MODAL",
      component: UploadForm,
      title: "Upload New",
      key: "new",
    },
    actions: {
      active: true,
      actions: [
        {
          name: "Remove",
          type: "MODAL",
          link: "",
          key: "id",
          icon: <IoIosRemoveCircleOutline />,
          component: DeleteSlide,
        },
        {
          name: "Update",
          type: "MODAL",
          link: "",
          key: "id",
          actionData: data,
          icon: null,
          component: UpdateSlide,
        },
      ],
    },
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="m-[10px] text-lg font-bold">Slide List</h2>
      <Table data={data || []} metaData={[]} options={tableOptions} />
    </div>
  );
};

export default SlideList;

"use client";
import { Button } from "@/components/ui";
import useModalStore from "@/store/useModalStore";
import React from "react";
import UploadForm from "./UploadForm";

const UploadNewSlide = () => {
  const { setOpen, setChildren, setTitle } = useModalStore(state => state);
  const handleModal = () => {
    setTitle("Upload new main Swiper");
    setChildren(<UploadForm />);
    setOpen();
  };
  return (
    <Button onClick={() => handleModal()} bgColor="green">
      Upload New
    </Button>
  );
};

export default UploadNewSlide;

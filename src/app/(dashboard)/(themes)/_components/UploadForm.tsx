"use client";
import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { uploadFile } from "@/services";
import { createSwiper } from "@/services/swiper.service";
import { toast } from "react-toastify";
import useModalStore from "@/store/useModalStore";
import useRefetchStore from "@/store/useRefetchStore";

const UploadForm = () => {
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [published, setPublished] = useState(false);
  const [isUploading, setIsUploading] = useState(true);
  const { setClose } = useModalStore(state => state);
  const { setRefetch } = useRefetchStore(state => state);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file!");
      return;
    }
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await uploadFile(formData);
      const uploadData = await uploadResponse;
      const { imageUrl } = uploadData;

      const postData = {
        link,
        img: imageUrl,
        published,
      };

      await createSwiper(postData);

      toast.success("Successfully uploaded and saved!");
      setLink("");
      setFile(null);
      setPublished(false);
      setRefetch();
      setClose();
    } catch (error) {
      toast.error("Error uploading or saving data!");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input type="text" label="Link" value={link} onChange={e => setLink(e.target.value)} />
      <Input type="file" label="Image" onChange={handleFileChange} />
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="published">Published</label>
        <input
          id="published"
          className="w-max"
          type="checkbox"
          checked={published}
          onChange={() => setPublished(!published)}
        />
      </div>
      <Button type="submit" disable={isUploading}>
        {isUploading ? "Add new" : "Uploading..."}
      </Button>
    </form>
  );
};

export default UploadForm;

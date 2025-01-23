"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import useModalStore from "@/store/useModalStore";
import Selector from "@/components/ui/Selector";
import useSelectorStore from "@/store/useSelectorStore";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { getAllUser } from "@/services";
import { handleGetAuthCookie } from "@/utils/cookies";
import { api } from "@/config";
import { toast } from "react-toastify";

type Inputs = {
  title: string;
  recipientIds: number[] | string[];
  content: string;
  trigerAt: string | null;
  category: string | number;
};

const CreateNotifi = () => {
  const { setOpen, setChildren, setTitle } = useModalStore();
  const { selectedItem, addSelectedItem, resetSelectedItems } = useSelectorStore();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      recipientIds: [],
      content: "",
      trigerAt: null,
      category: "",
    },
  });

  // Function to preview notification in modal
  const notificationPreview = (data: any) => {
    const htmlContent = data;
    setChildren(<div dangerouslySetInnerHTML={{ __html: htmlContent }} />);
    setTitle("Notification preview");
    setOpen();
  };

  const onSubmit: SubmitHandler<Inputs> = async data => {
    toast.promise(
      (async () => {
        if (!data.trigerAt) {
          data.trigerAt = null;
        }
        const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_NEST_API_URL;
        // Make API request with form data
        const token = await handleGetAuthCookie();
        const response = await api({
          url: `${backendUrl}/notification/create`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle the response
        if (response.statusCode === 201) {
          resetSelectedItems();
          reset();
          return "Notification sent successfully!";
        } else {
          throw new Error(response.message);
        }
      })(),
      {
        pending: "Sending notification...",
        success: "Notification sent successfully! 👌",
        error: "Failed to send notification. 🤯",
      },
    );
  };

  useEffect(() => {
    const modifiedSelectedItem = selectedItem.map(i => i.id);
    setValue("recipientIds", modifiedSelectedItem);
  }, [selectedItem, setValue]);

  // Fetch user data
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `?per_page=24`;
        const userData = await getAllUser(endpoint);
        console.log(userData);
        setUserList(userData.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to open modal with selector
  const openUserSelector = () => {
    setChildren(<Selector data={userList} displayKey="user_name" uniqueKey="id" />);
    setTitle("Select user");
    setOpen();
  };

  // Dropdown options
  const options = [
    { value: "NOTIFI", label: "Notifi" },
    { value: "POPUP", label: "Popup" },
  ];

  return (
    <div className="w-full">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Date input for the trigger */}
        <div>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                error={errors.title?.message}
                label="title"
                type="text"
                {...field}
                value={field.value || ""}
                onChange={e => field.onChange(e.target.value || null)}
              />
            )}
          />
        </div>

        <div className="w-max">
          <Controller
            name="recipientIds"
            control={control}
            rules={{ required: "Users are required" }}
            render={({ field }) => (
              <Button type="button" onClick={openUserSelector}>
                Select Users
              </Button>
            )}
          />
          {errors.recipientIds && (
            <p className="text-red-500 text-sm my-2">{errors.recipientIds.message}</p>
          )}
        </div>

        <div className="flex gap-5 justify-center items-center flex-col md:flex-row">
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                label="Select an Option"
                name="category"
                options={options}
                placeholder="Select an option"
                error={errors.category?.message}
                onChange={value => field.onChange(value)}
              />
            )}
          />
        </div>

        {/* Textarea for the content */}
        <div>
          <Controller
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            render={({ field }) => (
              <Textarea error={errors.content?.message} label="Content" {...field} />
            )}
          />
        </div>

        {/* Preview button */}
        <div className="w-max">
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <Button icon={FaEye} type="button" onClick={() => notificationPreview(field.value)}>
                Preview
              </Button>
            )}
          />
        </div>

        {/* Date input for the trigger */}
        <div>
          <Controller
            name="trigerAt"
            control={control}
            render={({ field }) => (
              <Input
                error={errors.trigerAt?.message}
                label="Trigger Date"
                type="datetime-local"
                {...field}
                value={field.value || ""}
                onChange={e => field.onChange(e.target.value || null)}
              />
            )}
          />
        </div>

        {/* Create Notification button */}
        <div>
          <Button>Create</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNotifi;

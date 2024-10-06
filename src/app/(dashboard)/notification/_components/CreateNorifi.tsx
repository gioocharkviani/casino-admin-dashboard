'use client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import React, { useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import useModalStore from '@/store/useModalStore';
import Selector from '@/components/ui/Selector';
import useSelectorStore from '@/store/useSelectorStore';

const CreateNotifi = () => {
  const { setOpen, setChildren } = useModalStore(); // Modal store to open/close the modal

  // Example user data
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Jane Smith' },
    { id: 4, name: 'Jane Smith' },
    { id: 5, name: 'Jane Smith' },
    { id: 654, name: 'Jane Smith' },
    { id: 634, name: 'Jane Smith' },
    { id: 663, name: 'Jane Smith' },
    { id: 623, name: 'Jane Smith' },
    { id: 65, name: 'Jane Smith' },
  ];

  // Function to open modal with selector
  const openUserSelector = () => {
    setChildren(<Selector data={users} displayKey="name" uniqueKey="id" />);
    setOpen();
  };

  // Dropdown options
  const options = [
    { value: 'NOTIFI', label: 'Notifi' },
    { value: 'POPUP', label: 'Popup' },
  ];

  return (
    <div className="w-full">
      <form className="flex flex-col gap-5">
        <div className="w-max">
          <Button type="button" onClick={openUserSelector}>
            Select Users
          </Button>
        </div>
        <div className="flex gap-5 justify-center items-center flex-col md:flex-row">
          <Select
            label="Select an option"
            name="selectField"
            options={options}
            placeholder="Choose..."
            onChange={(value) => console.log(value)}
          />
        </div>

        {/* Textarea for the content */}
        <div>
          <Textarea label="Content" />
        </div>

        {/* Preview button */}
        <div className="w-max">
          <Button icon={FaEye}>Preview</Button>
        </div>

        {/* Date input for the trigger */}
        <div>
          <Input label="Trigger Date" type="date" />
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

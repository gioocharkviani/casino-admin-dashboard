'use client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';

const CreateNotifi = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const options = [
    { value: 'NOTIFI', label: 'Notifi' },
    { value: 'POPUP', label: 'Popup' },
  ];

  return (
    <div className="w-full">
      <form className="flex flex-col gap-5">
        <div className="flex gap-5 flex-col md:flex-row">
          <Input type="text" label="Recipient id" />
          <Select
            label="Select an option"
            name="selectField"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
            ]}
            placeholder="Choose..."
            onChange={(value) => console.log(value)}
          />
        </div>
        <div>
          <Textarea label="content" />
        </div>
        <div className="w-max">
          <Button icon={FaEye}>preview</Button>
        </div>
        <div>
          <Input label="trigger" type="date" />
        </div>
        <div>
          <Button>Create</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNotifi;

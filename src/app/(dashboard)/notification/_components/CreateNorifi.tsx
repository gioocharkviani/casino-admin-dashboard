"use client"
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";



const CreateNotifi = () => {
//   NOTIFICATION RECIPIENT ID

const options2 = [
    { value: 'NOTIFI' },
    { value: 'POPUP' },]
//   NOTIFICATION RECIPIENT ID

//   NOTIFICATION CATEGORY
const [selectedValue, setSelectedValue] = useState('');
const options = [
    { value: 'NOTIFI'},
    { value: 'POPUP'},
];
//   NOTIFICATION CATEGORY

  return (
    <div className='w-full'>
        <form className='flex flex-col gap-5'>
          <div className='flex gap-5 flex-col md:flex-row'>
            <Select
              options={options2}
              search={true}
              select={true}
              label='Select Recepient Id' 
              selectedValue={selectedValue} 
              onChange={(value: string)=>setSelectedValue(value)} 
            />
            <Select options={options} label='select category' selectedValue={selectedValue} onChange={(value: string)=>setSelectedValue(value)} />
          </div>
          <div>
            <Textarea label='content' />
          </div>
          <div className='w-max'>
            <Button icon={FaEye} >preview</Button>
          </div>
          <div>
            <Input label='trigger' type='date' />
          </div>
          <div>
            <Button >
              Create
            </Button>
          </div>
        </form>
    </div>
  )
}

export default CreateNotifi
"use client";
import React from "react";
import { FaCheck } from "react-icons/fa";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ id, checked, onChange }: CheckboxProps) => {
  return (
    <div className={`customCheckbox1 ${checked ? "checkedCustom1" : ""}`}>
      <label htmlFor={id}>
        <FaCheck className={`${checked ? "cusCheckIcon" : "cusUnCheckIcon"}`} />
      </label>
      <input onChange={onChange} id={id} type="checkbox" checked={checked} />
    </div>
  );
};

export default Checkbox;

import React from "react";

interface Checkbox1Props {
  label?: string;
  id: string;
  checked?: boolean;
  onChange?: (e: any) => void;
}

const Checkbox1 = ({ label, id, checked, onChange }: Checkbox1Props) => {
  return (
    <div className="checkbox1con w-max">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="hidden" />
      <label
        htmlFor={id}
        className={`checkbox1label px-3 py-2 boroder text-nowrap shadow-lg font-medium rounded-md w-full cursor-pointer h-full flex justify-center items-center`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox1;

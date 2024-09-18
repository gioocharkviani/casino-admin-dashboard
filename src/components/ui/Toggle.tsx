
import React from 'react';

interface ToggleProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toggle = ({ checked, onChange }:ToggleProps) => {
    return (
        <div className="toggle-container">
            <input
                type="checkbox"
                id="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor="checkbox" className="toggle-btn"></label>
        </div>
    );
};

export default Toggle;

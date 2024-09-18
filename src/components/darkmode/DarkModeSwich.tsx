"use client";
import React, { useEffect, useState } from 'react';
import { IoSunnySharp } from "react-icons/io5";
import { LuMoonStar } from "react-icons/lu";

const DarkModeSwitch: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme");
            const isDark = theme === 'dark';

            setDarkMode(isDark);

            if (isDark) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }, []); // Runs once on mount

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setDarkMode(isChecked);

        if (isChecked) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <div className='dark-mode-switch'>
            <label htmlFor='darkmode' className='dark-mode-label'>
                {darkMode && <IoSunnySharp className='w-6 h-6 text-[yellow]'/>}
                {!darkMode && <LuMoonStar className='w-6 h-6 text-darkBlue'/>}
            </label>
            <input type="checkbox" onChange={handleChange} checked={darkMode}  className='dark-mode-input' id="darkmode"/>
        {/* <Toggle checked={darkMode} onChange={handleChange} /> */}
        </div>
    );
};

export default DarkModeSwitch;

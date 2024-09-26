"use client";

import Link from "next/link";
import { CiFolderOn } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

import { useEffect, useState } from "react";

export default function SidebarItem({ data, isOpen }: any) {
  const [isDrop, setIsDrop] = useState(false);
  useEffect(() => {
    setIsDrop(false);
  }, [!isOpen]);
  const IconComponent = data.icon;

  return (
    <>
      {/* LINK COMPONENT */}
      {data.dropdown.length === 0 && (
        <Link
          href={data.link}
          className="w-full px-2 py-3 items-center dark:hover:bg-darkHover hover:bg-blue-100 rounded-md flex relative"
        >
          <div
            className={`w-full font-medium transition-all flex ${
              !isOpen ? "justify-center" : "justify-start"
            } items-center capitalize`}
          >
            <IconComponent />
            {isOpen && (
              <span
                className={`${
                  isOpen ? "w-full ml-3" : "w-0"
                } text-[0.9rem] overflow-hidden transition-all`}
              >
                {data.text}
              </span>
            )}
          </div>
        </Link>
      )}
      {/* LINK COMPONENT */}

      {/* DROPDOWN BUTTON */}
      {data.dropdown.length !== 0 && (
        <button
          disabled={!isOpen}
          onClick={() => setIsDrop(!isDrop)}
          className="w-full px-2 py-3 items-center hover:bg-blue-100 dark:hover:bg-darkHover rounded-md flex justify-between relative"
        >
          <div
            className={`w-full font-medium transition-all flex ${
              isOpen ? "" : " justify-center"
            } items-center capitalize`}
          >
            <IconComponent />
            {isOpen && (
              <span
                className={`${
                  isOpen ? "w-max ml-3" : "w-0"
                } text-[0.9rem] overflow-hidden transition-all`}
              >
                {data.text}
              </span>
            )}
          </div>

          {isOpen && (
            <IoIosArrowDown
              className={`transition-all ease-in-out rotate-[-90deg] ${
                isDrop ? "rotate-[0deg] text-bold text-bs-success" : ""
              }`}
            />
          )}
        </button>
      )}
      {/* DROPDOWN BUTTON */}

      {/* DROPDOWN COMPONENT */}
      {data.dropdown.length !== 0 && (
        <div
          className={`bg-white dark:bg-darkHover dark:border-darkBg rounded-md  transition-all overflow-hidden w-full ${
            isDrop ? "h-max shadow-lg my-1 border" : "h-0"
          } `}
        >
          <ul className="flex flex-col p-2 ">
            {data.dropdown.map((i: any, index: number) => (
              <Link
                key={i.id || index}
                href={i.link}
                className="flex items-center rounded-md px-1 py-2 gap-2 dark:border-darkBlue dark:hover:bg-darkBlue border-b shadow-sm hover:bg-blue-100 transition-all"
              >
                <CiFolderOn />
                <span className="capitalize text-[0.8rem]">{i.text}</span>
              </Link>
            ))}
          </ul>
        </div>
      )}
      {/* DROPDOWN COMPONENT */}
    </>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";

const Navigate = () => {
  const pathname = usePathname();
  
  // Split the pathname into segments, e.g., "/notification/create" -> ["notification", "create"]
  const segments = pathname.split('/').filter(Boolean);

  // Create an array of paths, e.g., ["notification", "create"] -> ["/notification", "/notification/create"]
  const paths = segments.map((_, index) => `/${segments.slice(0, index + 1).join('/')}`);

  return (

      <ul className="flex items-center gap-1 capitalize h-full text-[0.8rem]">
        <li className="hover:text-[#7c7c7c] dark:hover:text-[#7c7c7c]">
          <Link className="flex items-center gap-1" href="/">
            <AiOutlineHome />
            Home
          </Link>
        </li>

        {segments.length > 0 && paths.map((path, index) => (
          <li key={index} className="sm:flex hidden items-center gap-1 hover:text-[#7c7c7c] dark:hover:text-[#7c7c7c]">
            <span className="mx-1">/</span>
            <Link href={path}>
              {segments[index]}
            </Link>
          </li>
        ))}
      </ul>

  );
};

export default Navigate;

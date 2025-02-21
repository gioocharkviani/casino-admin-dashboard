import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const useSearchParamsUpdater = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = (params: { [key: string]: string | number | null }) => {
    const urlParams = new URLSearchParams(searchParams.toString());

    Object.keys(params).forEach(key => {
      if (params[key] === null || params[key] === "") {
        urlParams.delete(key);
      } else {
        urlParams.set(key, params[key].toString());
      }
    });

    router.push(`${pathname}?${urlParams.toString()}`);
  };

  return { updateSearchParams };
};

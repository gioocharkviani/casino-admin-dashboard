"use client";
import { useEffect } from 'react';
import Tables from '@/components/tables/Tables';
import useTableStore from '@/store/useTableStore';
import { getAllUser } from '@/services';
import { handleGetAuthCookie } from '@/utils/cookies';

const UserList = () => {
  const { page, perPage, sortBy, sortDirection, setData ,search , setMaxPage , setTotalItems } = useTableStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await handleGetAuthCookie();
        const apiUrl = `/admin/users?page=${page}&per_page=${perPage}&sort_by=${sortBy}&sort_direction=${sortDirection}&search=${search}`;
        const userData = await getAllUser({ apiUrl, token });
        setData(userData?.data);
        setMaxPage(Math.round(userData?.total / userData?.per_page) === 0 ? 1 : Math.round(userData?.total / userData?.per_page))
        setTotalItems(userData?.total)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [page, perPage, sortBy, sortDirection, setData , search]);

  const tableOptions = {
    search:true,
    select:true,
    filter:false,
    saveData:true,
    pagination:true,
    sort:true,
    settings:{
      title:'usersTable',
      active:true,
    },
    create:{
      active:true,
      link:'/'
    },
    actions:{
      active:false,
      edit:true,
      remove:true,
    },
  }

  return (
    <div>
      <Tables options={tableOptions}/>
    </div>
  );
};

export default UserList;

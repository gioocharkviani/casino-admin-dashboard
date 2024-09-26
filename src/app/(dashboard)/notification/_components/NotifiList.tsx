"use client"
import Tables from '@/components/tables/Tables';
import { getAllUser } from '@/services';
import useTableStore from '@/store/useTableStore';
import { handleGetAuthCookie } from '@/utils/token';
import React, { useEffect } from 'react'

const NotifiList = () => {
    const { page, perPage, sortBy, sortDirection, setData, search, setMaxPage, setTotalItems } =
    useTableStore();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = await handleGetAuthCookie();
            const apiUrl = `/admin/users?page=${page}&per_page=${perPage}&sort_by=${sortBy}&sort_direction=${sortDirection}&search=${search}`;
            const userData = await getAllUser({ apiUrl, token });
            setData(userData?.data);
            setMaxPage(Math.ceil(userData?.total / userData?.per_page));
            setTotalItems(userData?.total);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchData();
      }, [page, perPage, sortBy, sortDirection, setData, search]);
      
    const tableOptions = {
        search: true,
        select: true,
        filter: false,
        saveData: true,
        pagination: true,
        sort: true,
        settings: {
          title: "notificationTable",
          active: true,
        },
        create: {
          active: true,
          link: "/notification/create",
        },
        actions: {
          active: false,
          edit: "/notification/edit",
          remove: false,
        },
      };

  return (
    <div>
        <Tables options={tableOptions} />
    </div>
  )
}

export default NotifiList
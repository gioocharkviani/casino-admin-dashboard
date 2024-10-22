'use client';
import Tables from '@/components/tables/Tables';
import useNotifications from '@/hooks/useNotification';
import { getAllNotification } from '@/services/notification.service';
import useTableStore from '@/store/useTableStore';
import { handleGetAuthCookie } from '@/utils/token';
import React, { useEffect } from 'react';

const NotifiList = () => {
  const {
    page,
    perPage,
    sortBy,
    sortDirection,
    setData,
    search,
    setMaxPage,
    setTotalItems,
  } = useTableStore();

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_NEST_API_URL;
    const fetchData = async () => {
      try {
        const token = await handleGetAuthCookie();
        const apiUrl = `${backendUrl}/notification/admin?page=${page}&per_page=${perPage}&sort_by=${sortBy}&sort_direction=${sortDirection}&search=${search}`;
        const notificationData = await getAllNotification({ apiUrl, token });
        setData(notificationData.data);
        setMaxPage(
          Math.ceil(
            notificationData?.meta.total / notificationData?.meta.per_page
          )
        );
        setTotalItems(notificationData?.meta.total);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [page, perPage, sortBy, sortDirection, setData, search]);

  const tableOptions: any = {
    search: true,
    select: true,
    filter: {
      active: false,
      filterBy: [],
    },
    saveData: true,
    pagination: true,
    sort: true,
    trclickaction: {
      active: false,
      link: '',
      component: '',
    },
    settings: {
      title: 'notificationTable',
      active: true,
    },
    create: {
      active: true,
      link: '/notification/create',
    },
    actions: {
      active: true,
      actions: [],
      edit: '/notification/edit',
      remove: true,
    },
  };

  return (
    <div>
      <Tables options={tableOptions} />
    </div>
  );
};

export default NotifiList;

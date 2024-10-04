'use client';
import Tables from '@/components/tables/Tables';
import useTableStore from '@/store/useTableStore';
import { handleGetAuthCookie } from '@/utils/token';
import React, { useEffect } from 'react';
import { getUserLog } from '@/services';
import { useParams } from 'next/navigation';

const UserLogs = () => {
  const params = useParams();
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
    const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_BASE_API_URL;
    const fetchData = async () => {
      try {
        const token = await handleGetAuthCookie();
        const apiUrl = `${backendUrl}/admin/users/${params.id}/logs`;
        const userLog = await getUserLog({ apiUrl, token });
        setData(userLog.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [page, perPage, sortBy, sortDirection, setData, search]);

  const tableOptions = {
    search: true,
    select: true,
    filter: {
      active: false,
      filterBy: [],
    },
    saveData: true,
    pagination: false,
    sort: true,
    trclickaction: {
      active: false,
      link: '',
      component: '',
    },
    settings: {
      title: 'UserLogTable',
      active: true,
    },
    create: {
      active: false,
      link: '',
    },
    actions: {
      active: false,
      edit: '',
      remove: false,
    },
  };

  return (
    <div>
      <Tables options={tableOptions} />
    </div>
  );
};

export default UserLogs;

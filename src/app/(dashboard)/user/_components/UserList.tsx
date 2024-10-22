'use client';
import { useEffect } from 'react';
import Tables from '@/components/tables/Tables';
import useTableStore from '@/store/useTableStore';
import { getAllUser } from '@/services';
import { handleGetAuthCookie } from '@/utils/cookies';
import { TableOptions } from '@/components/tables/tableOptions.types';

const UserList = () => {
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
        const apiUrl = `${backendUrl}/admin/users?page=${page}&per_page=${perPage}&sort_by=${sortBy}&sort_direction=${sortDirection}&search=${search}`;
        const userData = await getAllUser({ apiUrl, token });
        setData(userData?.data);
        setMaxPage(Math.ceil(userData?.meta.total / userData?.meta.per_page));
        setTotalItems(userData?.meta.total);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [page, perPage, sortBy, sortDirection, setData, search]);

  const tableOptions: TableOptions = {
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
      link: '/user/logs',
      component: null,
    },
    settings: {
      title: 'usersTable',
      active: true,
    },
    create: {
      active: false,
      link: '',
    },
    actions: {
      active: true,
      actions: [
        {
          name: 'remove',
          type: 'MODAL',
          icon: null,
          link: '',
          component: '',
        },
        {
          name: 'remove',
          type: 'MODAL',
          icon: null,
          link: '',
          component: '',
        },
        {
          name: 'remove',
          type: 'MODAL',
          icon: null,
          link: '',
          component: '',
        },
      ],
    },
  };

  return (
    <div>
      <Tables options={tableOptions} />
    </div>
  );
};

export default UserList;

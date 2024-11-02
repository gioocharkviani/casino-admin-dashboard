'use client';
import { useEffect } from 'react';
import Tables from '@/components/tables/Tables';
import useTableStore from '@/store/useTableStore';
import { getAllUser } from '@/services';
import { handleGetAuthCookie } from '@/utils/cookies';
import { TableOptions } from '@/components/tables/tableOptions.types';
import DeactiveUserComp from './DeactiveUserComp';
import { LuUserCircle } from 'react-icons/lu';
import { MdLockOutline, MdOutlineAdminPanelSettings } from 'react-icons/md';
import BlackListAddComp from './BlackListAddComp';
import { FaUserLock } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';

const UserList = () => {
  const {
    page,
    perPage,
    sortBy,
    sortDirection,
    setData,
    search,
    setMaxPage,
    reFetch,
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
  }, [page, perPage, sortBy, sortDirection, setData, search, reFetch]);

  const tableOptions: TableOptions = {
    uniqueKey: 'id',
    search: true,
    select: true,
    filter: {
      active: false,
      filterBy: [],
    },
    saveData: true,
    pagination: true,
    sort: true,
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
          name: 'user logs',
          type: 'LINK',
          link: '/user/logs/',
          icon: <LuUserCircle />,
          key: 'id',
        },
        {
          name: 'Deactive',
          type: 'MODAL',
          link: '',
          key: 'id',
          icon: <MdLockOutline />,
          component: DeactiveUserComp,
        },
        {
          name: 'add to blacklist',
          type: 'MODAL',
          link: '',
          key: 'id',
          icon: <FaUserLock />,
          component: BlackListAddComp,
        },
        {
          name: 'General',
          type: 'MODAL',
          link: '',
          key: 'id',
          icon: <IoSettingsOutline />,
          component: BlackListAddComp,
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

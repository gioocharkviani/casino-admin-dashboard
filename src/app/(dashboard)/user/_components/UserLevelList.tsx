'use client';
import { useEffect } from 'react';
import Tables from '@/components/tables/Tables';
import useTableStore from '@/store/useTableStore';
import { getAllUser } from '@/services';
import { handleGetAuthCookie } from '@/utils/cookies';
import { TableOptions } from '@/components/tables/tableOptions.types';
import { MdLockOpen } from 'react-icons/md';
import ActiveUserComp from './ActiveUserComp';

const UserLevelList = () => {
  const { page, perPage, sortBy, sortDirection, setData, search, reFetch } =
    useTableStore();

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_BASE_API_URL;
    const fetchData = async () => {
      try {
        const token = await handleGetAuthCookie();
        const apiUrl = `${backendUrl}/admin/levels`;
        const userData = await getAllUser({ apiUrl, token });
        setData(userData?.data);
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
    pagination: false,
    sort: true,
    settings: {
      title: 'UserLevels',
      active: true,
    },
    create: {
      active: false,
      link: '',
    },
    actions: {
      active: false,
      actions: [
        {
          name: 'active',
          type: 'MODAL',
          icon: <MdLockOpen />,
          key: 'user_id',
          link: '',
          component: ActiveUserComp,
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

export default UserLevelList;

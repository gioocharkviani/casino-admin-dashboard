'use client';
import { useEffect } from 'react';
import Tables from '@/components/tables/Tables';
import useTableStore from '@/store/useTableStore';
import { getAllUser } from '@/services';
import { handleGetAuthCookie } from '@/utils/cookies';
import { TableOptions } from '@/components/tables/tableOptions.types';
import { MdLockOpen } from 'react-icons/md';
import ActiveUserComp from './ActiveUserComp';

const DeactivatedUserList = () => {
  const {
    page,
    perPage,
    sortBy,
    sortDirection,
    setData,
    search,
    reFetch,
    setMaxPage,
    setTotalItems,
  } = useTableStore();

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_BASE_API_URL;
    const fetchData = async () => {
      try {
        const token = await handleGetAuthCookie();
        const apiUrl = `${backendUrl}/admin/deactivated-users`;
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
    pagination: true,
    sort: true,
    settings: {
      title: 'deactiveUsersTable',
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

export default DeactivatedUserList;

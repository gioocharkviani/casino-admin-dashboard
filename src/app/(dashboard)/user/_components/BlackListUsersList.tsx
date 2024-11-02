'use client';
import { useEffect } from 'react';
import Tables from '@/components/tables/Tables';
import useTableStore from '@/store/useTableStore';
import { getAllUser } from '@/services';
import { handleGetAuthCookie } from '@/utils/cookies';
import { TableOptions } from '@/components/tables/tableOptions.types';
import BlacklistUserRemvoveComp from './BlacklistUserRemvoveComp';
import { FaUserCheck } from 'react-icons/fa6';

const BlackListUsers = () => {
  const {
    page,
    perPage,
    sortBy,
    sortDirection,
    setData,
    search,
    setMaxPage,
    setTotalItems,
    reFetch,
  } = useTableStore();

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_BASE_API_URL;
    const fetchData = async () => {
      try {
        const token = await handleGetAuthCookie();
        const apiUrl = `${backendUrl}/admin/blacklist`;
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
    pagination: false,
    sort: true,
    settings: {
      title: 'blackListUsers',
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
          icon: <FaUserCheck />,
          key: 'user_id',
          link: '',
          component: BlacklistUserRemvoveComp,
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

export default BlackListUsers;

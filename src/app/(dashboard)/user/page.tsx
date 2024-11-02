import React from 'react';
import UserList from './_components/UserList';

const pageUsers = () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <UserList />
    </div>
  );
};

export default pageUsers;

import React from 'react';
import DeactivatedUserList from '../_components/DeactivatedUsersList';

const page = () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <DeactivatedUserList />
    </div>
  );
};

export default page;

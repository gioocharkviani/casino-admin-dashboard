import React from 'react';
import BlackListUsers from '../_components/BlackListUsersList';

const pageBlacklist = () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <BlackListUsers />
    </div>
  );
};

export default pageBlacklist;

import React from 'react';
import ProgressBarProvider from './ProgressBarProvider';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProgressBarProvider>{children}</ProgressBarProvider>
    </>
  );
};

export default Provider;

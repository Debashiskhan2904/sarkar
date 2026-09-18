import React from 'react';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page active" style={{ display: 'block' }}>
      {children}
    </div>
  );
};

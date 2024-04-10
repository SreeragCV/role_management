import React, { createContext, useState } from 'react';

const RolesContext = createContext();

const RolesProvider = ({ children }) => {
  const [role, setRole] = useState('');

  return (
    <RolesContext.Provider value={{ role, setRole }}>
      {children}
    </RolesContext.Provider>
  );
};

export { RolesContext, RolesProvider };
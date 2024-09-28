import React, { createContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('Cases');

  return (
    <SidebarContext.Provider value={{ selectedSidebarItem, setSelectedSidebarItem }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;

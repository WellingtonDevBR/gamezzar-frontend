import { createContext, useContext, useState } from "react";

export const TabContext = createContext({
  activeTab: "Opportunities", // This should match your initial state value
  setActiveTab: (value: string) => {}, // A function that accepts a string
});

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Opportunities");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => useContext(TabContext);

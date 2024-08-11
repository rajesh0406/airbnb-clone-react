import { createContext, useContext, useDeferredValue, useState } from "react";

export const SearchContext = createContext({});

export const SearchContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const deferredSearch = useDeferredValue(searchValue);

  const updateSearch = (str) => {
    setSearchValue(str);
  };
  return (
    <SearchContext.Provider value={{ search: deferredSearch, updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

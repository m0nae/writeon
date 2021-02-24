import React, { createContext, useState, useRef } from "react";

export const SearchContext = createContext({});

export function SearchProvider (props) {
  const searchBar = useRef();
  const [searchInput, setSearchInput] = useState(null);

  return (
    <SearchContext.Provider
      value={{
        searchBar: searchBar,
        searchInput: searchInput,
        setSearchInput: setSearchInput
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}

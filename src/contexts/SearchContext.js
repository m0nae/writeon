import React, { createContext, useState, useRef } from 'react';

export const SearchContext = createContext({});

export function SearchProvider(props) {
  const searchBar = useRef();
  const [searchInput, setSearchInput] = useState(null);
  const [searchBarFocused, setSearchBarFocused] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchBar: searchBar,
        searchInput: searchInput,
        setSearchInput: setSearchInput,
        searchBarFocused: searchBarFocused,
        setSearchBarFocused: setSearchBarFocused
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}

import { Box } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import { NoteCard } from '../../components/NoteCard';

export function SearchResults({ posts, gridView }) {
  const { searchInput } = useContext(SearchContext)
  const [results, setResults] = useState([]);

  useEffect(() => {
    function filterSearch() {
      if (posts && searchInput && searchInput.length > 2) {
        console.log(posts);

        let matches = posts.filter(post => {
          const regex = new RegExp(`${searchInput}`, "gi");
          return post.title.match(regex) || post.textContent.match(regex);
        })

        setResults(matches);
      } 
    }

    filterSearch();
  }, [searchInput, posts])


  return (
    <>
      <Box className={gridView ? "grid-view" : "list-view"}>
      { results && results.map((post) => {
          return <NoteCard
            key={post._id} 
            _id={post._id}
            title={post.title}
            textContent={post.textContent && post.textContent}
            // onClick={onClick}
          />
        })
      }
      </Box>
    </>
  )
}
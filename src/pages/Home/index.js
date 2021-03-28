import React, { useContext, useEffect, useState } from 'react';
import styles from './home.module.scss';
import { Box, Flex, Select } from '@chakra-ui/react';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';
import { MdList } from 'react-icons/md';
import { RiLayoutGridFill } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { OptionsMenuContext } from '../../contexts/OptionsMenuContext';
import { SearchContext } from '../../contexts/SearchContext';
import { UserContext } from '../../contexts/UserContext';
import { Layout } from '../../Layout';
import { Loading } from '../Loading';
import { SearchResults } from '../SearchResults';
import { AlertDialog } from '../../components/AlertDialog';
import { NoteCard } from '../../components/NoteCard';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_POST, GET_ALL_POSTS } from '../../gql';

export function Home() {
  const { user } = useContext(UserContext);
  const { searchInput, setSearchInput } = useContext(SearchContext);
  const {
    isDeleteAlertOpen,
    deleteAlertRef,
    closeDeleteAlert,
    deletePostErrorT
  } = useContext(OptionsMenuContext);

  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [gridView, setGridView] = useState(true);
  const [sortBy, setSortBy] = useState('dateModified');
  const [sortOrder, setSortOrder] = useState('descending');
  const [clickedPostId, setClickedPostId] = useState();

  const { refetch: refetchAllPosts } = useQuery(GET_ALL_POSTS, {
    onCompleted: (GET_ALL_POSTS) => {
      console.log('get all posts query ran');
      setPosts(GET_ALL_POSTS.posts);
      setLoading(false);
      console.log(GET_ALL_POSTS.posts);
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
  });

  const [deletePost, { error: deletePostError }] = useMutation(DELETE_POST, {
    variables: { id: clickedPostId },
    onCompleted: () => {
      console.log('Post deleted!');
    }
  });

  function sortPosts(a, b, property) {
    if (property === 'title') {
      let firstElem = a.title.toUpperCase();
      let secondElem = b.title.toUpperCase();

      if (firstElem < secondElem) {
        return sortOrder === 'ascending' ? -1 : 1;
      }

      if (firstElem > secondElem) {
        return sortOrder === 'ascending' ? 1 : -1;
      }
      return 0;
    } else {
      let date1 = new Date(a[property]);
      let date2 = new Date(b[property]);
      return sortOrder === 'ascending' ? date1 - date2 : date2 - date1;
    }
  }

  async function handleDelete() {
    await deletePost({
      variables: {
        id: clickedPostId
      }
    });

    closeDeleteAlert();

    if (deletePostError) {
      deletePostErrorT();
    }

    refetchAllPosts();
  }

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user]);

  // when Home component unmounts, reset the search bar
  useEffect(() => {
    return () => {
      setSearchInput('');
    };
  }, []);

  useEffect(() => {
    if (posts) {
      switch (sortBy) {
        case 'title':
          let sortedTitles = posts
            .slice()
            .sort((a, b) => sortPosts(a, b, 'title'));

          setPosts(sortedTitles);
          break;
        case 'dateCreated':
          let sortedCreatedDates = posts
            .slice()
            .sort((a, b) => sortPosts(a, b, 'dateCreated'));
          console.log(sortedCreatedDates);
          setPosts(sortedCreatedDates);
          break;
        case 'dateModified':
          let sortedModifiedDates = posts
            .slice()
            .sort((a, b) => sortPosts(a, b, 'dateModified'));
          console.log(sortedModifiedDates);
          setPosts(sortedModifiedDates);
          break;
        default:
          break;
      }
    }
  }, [sortBy, sortOrder]);

  return (
    <>
      {loading || posts === null ? (
        <Loading />
      ) : (
        <Layout>
          <Box>
            <AlertDialog
              isOpen={isDeleteAlertOpen}
              leastDestructiveRef={deleteAlertRef}
              onClose={closeDeleteAlert}
              isCentered
              deleteAlertRef={deleteAlertRef}
              closeDeleteAlert={() => closeDeleteAlert()}
              handleDelete={() => handleDelete()}
            />

            <Flex
              mb="1rem"
              justifyContent="flex-end"
              className={styles['view-menu']}
            >
              <Select
                width="180px"
                justifySelf="end"
                mr="1rem"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="dateModified">Date Last Edited</option>
                <option value="title">Title</option>
                <option value="dateCreated">Date Created</option>
              </Select>
              <Box
                onClick={
                  sortOrder === 'ascending'
                    ? () => setSortOrder('descending')
                    : () => setSortOrder('ascending')
                }
              >
                {sortOrder === 'ascending' ? (
                  <HiSortAscending
                    aria-label="Ascending"
                    title="Ascending"
                    className={styles['ascending-icon']}
                  />
                ) : (
                  <HiSortDescending
                    aria-label="Descending"
                    title="Descending"
                    className={styles['ascending-icon']}
                  />
                )}
              </Box>
              <Box>
                {gridView ? (
                  <MdList
                    aria-label="List view"
                    title="List view"
                    onClick={() => setGridView(!gridView)}
                    className={styles['list-view-icon']}
                  />
                ) : (
                  <RiLayoutGridFill
                    aria-label="Grid view"
                    title="Grid view"
                    onClick={() => setGridView(!gridView)}
                    className={styles['grid-view-icon']}
                  />
                )}
              </Box>
            </Flex>
            {searchInput && searchInput.length > 2 ? (
              <SearchResults posts={posts} gridView={gridView} />
            ) : (
              <Box className={gridView ? 'grid-view' : 'list-view'}>
                {posts &&
                  posts.map((post) => {
                    return (
                      <NoteCard
                        key={post._id}
                        _id={post._id}
                        title={post.title}
                        textContent={post.textContent && post.textContent}
                        gridView={gridView}
                        setClickedPostId={setClickedPostId}
                      />
                    );
                  })}
              </Box>
            )}
          </Box>
        </Layout>
      )}
    </>
  );
}

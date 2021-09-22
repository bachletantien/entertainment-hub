import {
  Button,
  createTheme,
  MuiThemeProvider,
  Tab,
  Tabs,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/pagination/CustomPagination';

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [content, setContent] = useState();
  const [numberOfPages, setNumberOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff',
      },
    },
  });
  const fetchSearch = async () => {
    try {
      const REACT_APP_API_KEY = 'cb4158bf49738b183c6ce6c585a84bad';
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? 'tv' : 'movie'
        }?api_key=${REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumberOfPages(data.total_pages);
    } catch (error) {}
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <MuiThemeProvider theme={darkTheme}>
        <div className='search' style={{ display: 'flex', margin: '15px 0' }}>
          <TextField
            style={{ flex: 1 }}
            className='searchBox'
            label='Search'
            variant='filled'
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Button
            variant='contained'
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}
          >
            <SearchIcon fontSize='large' />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: '5px' }}
        >
          <Tab style={{ width: '50%' }} label='Search Movie' />
          <Tab style={{ width: '50%' }} label='TV Series' />
        </Tabs>
      </MuiThemeProvider>

      <div className='trending'>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? 'tv' : 'movie'}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numberOfPages} />
      )}
    </div>
  );
};

export default Search;

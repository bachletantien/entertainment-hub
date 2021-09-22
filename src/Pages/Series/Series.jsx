import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Genre from '../../components/Genre/Genre';
import useGenres from '../../components/hooks/useGenres';
import CustomPagination from '../../components/pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);

  const REACT_APP_API_KEY = 'cb4158bf49738b183c6ce6c585a84bad';
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );

    setContent(data.results);
    setNumberOfPages(data.total_pages);

    console.log(data);
  };

  useEffect(() => {
    fetchMovies();
    //eslint-disable-next-line
  }, [page, genreforURL]);
  return (
    <div>
      <span className='pageTitle'>Series</span>

      <Genre
        type='tv'
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />

      <div className='trending'>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type='tv'
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </div>
  );
};

export default Series;

const useGenres = (selectGenres) => {
  if (selectGenres.length < 1) return '';

  const genreIds = selectGenres.map((g) => g.id);
  return genreIds.reduce((acc, curr) => acc + ',' + curr);
};

export default useGenres;

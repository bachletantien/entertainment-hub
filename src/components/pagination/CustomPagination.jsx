import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});

const CustomPagination = ({ setPage, numberOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numberOfPages}
          onChange={(e) => handlePageChange(e.target.textContent)}
          hideNextButton
          color='primary'
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;

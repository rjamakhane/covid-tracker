import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './styles.scss';

const Loader = () => {
  return (
    <Box className="loader" data-testid="Loader">
      <CircularProgress />
    </Box>
  );
}

export default Loader;
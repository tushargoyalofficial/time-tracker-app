import { CssBaseline } from '@mui/material';
import { FC, memo } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './src/routes';

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
};

export default memo(App);

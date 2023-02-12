import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowAlert from '../utils/showAlert';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { isActive, message, openSnackBar } = ShowAlert();

  const onLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/');
    openSnackBar('Logout successfully');
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Time Tracking App
        </Typography>
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Page 1
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Page 2
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Page 3
          </Link>
        </nav>
        <Button onClick={onLogout} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Logout
        </Button>
      </Toolbar>
      <Snackbar open={isActive} message={message} />
    </AppBar>
  );
};

export default memo(Navbar);

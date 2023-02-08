import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { FC, memo } from 'react';

const Copyright: FC<TypographyProps> = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link component={RouterLink} color="inherit" to="/">
        Time Tracker App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default memo(Copyright);

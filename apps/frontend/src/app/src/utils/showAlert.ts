import { useState, useEffect } from 'react';

const ShowAlert = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (isActive === true) {
      setTimeout(() => {
        setIsActive(false);
      }, 6000);
    }
  }, [isActive]);

  const openSnackBar = (msg = 'Something went wrong...') => {
    setMessage(msg);
    setIsActive(true);
  };

  return { isActive, message, openSnackBar };
};

export default ShowAlert;

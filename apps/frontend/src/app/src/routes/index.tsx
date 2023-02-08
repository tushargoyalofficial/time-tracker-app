import { createBrowserRouter } from 'react-router-dom';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginScreen />,
  },
  {
    path: '/signup',
    element: <SignupScreen />,
  },
]);

export default router;

import { createBrowserRouter } from 'react-router-dom';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
import DashboardScreen from '../screens/Dashboard';
import TaskScreen from '../screens/Task';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginScreen />,
  },
  {
    path: '/signup',
    element: <SignupScreen />,
  },
  {
    path: '/dashboard',
    element: <DashboardScreen />,
  },
  {
    path: '/task',
    element: <TaskScreen />,
  },
]);

export default router;

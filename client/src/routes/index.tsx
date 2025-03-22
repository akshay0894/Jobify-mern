import { createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Landing,
  Error,
  AddJob,
  Stats,
  Profile,
  AllJobs,
} from '../pages';
import { action as registerAction } from '../pages/register/Register';
import { action as loginAction } from '../pages/login/Login';
import { loader as userLoaderData } from '../pages/dashboard-layout/DashboardLayout';
import { action as addJobAction } from '../pages/add-job/AddJob';
import { loader as allJobsloader } from '../pages/all-jobs/AllJobs';
import EditJob, {
  loader as jobLoader,
  action as editJobAction,
} from '../pages/edit-job/EditJob';
import { action as deleteJobAction } from '../pages/delete-job/DeleteJob';
import Admin, { loader as adminLoader } from '../pages/admin/Admin';
import { action as editProfileAction } from '../pages/profile/Profile';

// const isDarkThemeEnabled = checkDefaultTheme();
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        loader: userLoaderData,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: editProfileAction,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsloader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: jobLoader,
            action: editJobAction,
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
        ],
      },
    ],
  },
]);

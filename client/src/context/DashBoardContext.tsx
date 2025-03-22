import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { toast } from 'react-toastify';
import React from 'react';

export type DashBoardContextType = {
  user: any;
  isDarkTheme: boolean;
  showSidebar: boolean;
  toggleDarkTheme: () => void;
  toggleSideBar: () => void;
  logoutUser: () => void;
};

export const DashBoardContext = createContext<DashBoardContextType | null>(
  null
);
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

export const DashBoardProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const data: any = useLoaderData();
  console.log('====data', data);

  const user = data.user;
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const [isAuthError, setIsAuthError] = useState(false);
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme.toString());
  };
  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    navigate('/');
    await apiClient.get('/auth/logout');
    toast.success('logging out');
  };

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);
  return (
    <DashBoardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSideBar,
        logoutUser,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashBoardContext);

  if (!context) {
    throw new Error(
      'Dashboard context must be used in Dahsboard context provider'
    );
  }

  return context;
};
/**
 * High orer function used as a selector and return selected part of state and componet will not re render
 * @param Component
 * @returns
 */
const withDashboardToggle = (Component: any) => {
  const MemoizedComponent = React.memo(Component);
  return (props: any) => {
    const { toggle } = useDashboardContext();
    return <MemoizedComponent {...props} toggle={toggle} />;
  };
};

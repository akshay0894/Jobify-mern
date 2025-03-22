import {
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import { BigSideBar, NavBar, SmallSideBar } from '../../components';
import Wrapper from './DashboardLayout.styles';
import { DashBoardProvider } from '../../context/DashBoardContext';
import apiClient from '../../utils/apiClient';
import Loading from '../../components/Loader/loading';

export const loader: LoaderFunction = async () => {
  try {
    const { data } = await apiClient.get('/users/current-user');
    return data;
  } catch {
    return redirect('/');
  }
};

export const DashboardLayout: React.FC<any> = () => {
  const data: any = useLoaderData();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <DashBoardProvider>
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              {isPageLoading ? (
                <Loading />
              ) : (
                <Outlet context={{ user: data.user }} />
              )}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashBoardProvider>
  );
};

export default DashboardLayout;

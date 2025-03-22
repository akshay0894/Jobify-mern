import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../../utils/apiClient';
import { createContext, useContext } from 'react';
import SearchContainer from '../../components/SearchContainer/SearhContainer';
import JobsContainer from '../../components/JobsContainer/JobsContainer';

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await apiClient.get('/jobs', { params });
    return {
      data,
      searchValues: { ...params },
    };
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export type JobContextType = {
  data: any;
  searchValues: any;
};

const AllJobsContext = createContext<JobContextType>({
  data: { jobs: [] },
  searchValues: {},
});

export const AllJobs: React.FC<any> = () => {
  const { data, searchValues } = useLoaderData() as any;

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};
export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;

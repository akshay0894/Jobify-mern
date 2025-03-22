import { useAllJobsContext } from '../../pages/all-jobs/AllJobs';
import Job from '../job/job';
import PageBtnContainer from '../page-btn-container/PageBtnContainer';
import Wrapper from './jobsContainer.styles';

export const JobsContainer: React.FC<any> = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.lenngth > 1 && 's'}
      </h5>
      <div className="jobs">
        {jobs.map((job: any) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;

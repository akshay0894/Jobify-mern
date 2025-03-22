import { Form, Link, useSubmit } from 'react-router-dom';
import Wrapper from '../../pages/add-job/add-job.styles';
import FormRow from '../formRow/FormRow';
import FormRowSelect from '../FormRowSelect/FormRowSelect';
import { JOB_SORT_BY, JobStatus, JobType } from '../../constants/constants';
import { useAllJobsContext } from '../../pages/all-jobs/AllJobs';

const debounce = (callback: Function, delay: number) => {
  let timer: any;
  return (e: any) => {
    const form = e.currentTarget.form;
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(form);
    }, delay);
  };
};

export const SearchContainer: React.FC<any> = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues as any;

  const submit = useSubmit();
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form: any) => {
              console.log(form);
              submit(form);
            }, 2000)}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={['all', ...Object.values(JobStatus)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit((e.currentTarget as HTMLFormElement).form);
            }}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={['all', ...Object.values(JobType)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit((e.currentTarget as HTMLFormElement).form);
            }}
          />
          <FormRowSelect
            name="sort"
            labelText="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              submit((e.currentTarget as HTMLFormElement).form);
            }}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;

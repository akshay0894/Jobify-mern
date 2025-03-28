import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from './jobs.styles';
import JobInfo from '../jobInfo/JobInfo';
import { Form } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

day.extend(advancedFormat);
 
 const Job: React.FC<any> = (props) => {

    const { _id,
        position,
        company,
        jobLocation,
        jobType,
        createdAt,
        jobStatus} = props;

        const date = day(createdAt).format('Mm Do, YYYY');

    return  (<Wrapper>
        <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
        </header>
        <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>

        </div>
        <footer className='actions'>
        <Link className='btn edit-btn' to={`../edit-job/${_id}`}>Edit</Link>
          <Form method='post' action={`../delete-job/${_id}`}>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
    </Wrapper>);
}

export default Job;
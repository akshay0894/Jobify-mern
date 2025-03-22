import Wrapper from './job-info.styles';

const JobInfo: React.FC<any> = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='job-icon'>{icon}</span>
      <span className='job-text'>{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
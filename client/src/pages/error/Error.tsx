import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import Wrapper from './Error.style';
import img from '../../assets/images/not-found.svg';

const Error: React.FC = () => {
    const error = useRouteError();
    console.log(error);
    if(isRouteErrorResponse(error)) {
        return <Wrapper>
            <div>
                <img src={img} alt='not found'/>
                <h3>Ohh! page not found</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to='/dashboard'>back home</Link>
            </div>
        </Wrapper>
    }
    return (<Wrapper>
        <h3>Something went wrong</h3>
    </Wrapper>)
}

export default Error;
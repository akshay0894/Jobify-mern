import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { FormRow, Logo } from '../../components';
import Wrapper from './Login.styles';
import { toast } from 'react-toastify';
import apiClient from '../../utils/apiClient';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: '' };
  if (typeof data.password === 'string' && data.password.length < 3) {
    errors.msg = 'password too short';
    return errors;
  }
  try {
    await apiClient.post('/auth/login', data);
    toast.success('Login Successful');
    return redirect('/dashboard');
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login: React.FC<any> = () => {
  const errors: any = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === 'submitting';

  const loginDemoUser = async () => {
    const data = { email: 'test123@test.com', password: 'secret123' };
    try {
      await apiClient.post('/auth/login', data);
      toast.success('take a test drive');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {errors?.msg}
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Already a member?
          <Link className="member-btn" to="/register">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;

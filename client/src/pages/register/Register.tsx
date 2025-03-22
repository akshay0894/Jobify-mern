import { Link , Form, useNavigation, redirect, ActionFunction} from "react-router-dom";
import { toast } from 'react-toastify';
import { FormRow, Logo } from "../../components";
import Wrapper from "./Register.styles";
import apiClient from "../../utils/apiClient";


export const action: ActionFunction = async({request}) => {
    const formData = await request?.formData();
    const data = Object.fromEntries(formData);
    try {
      await  apiClient.post('/auth/register', data);
      toast.success('Registration successfully');
      return redirect('/login');
    }catch(error:any) {
      toast.error(error?.response?.data?.msg || 'something went worng');
      return error;
    } 

}

const Register: React.FC<any> = () => {
 const navigation = useNavigation();
 const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form  method='post' className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' />
        <FormRow type='text' name='lastName' labelText='last name' />
        <FormRow type='text' name='location' />
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ?'submitting...': 'submit'}
        </button>
        <p>
          Already a member?
          <Link className="member-btn" to="/login">Login</Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;

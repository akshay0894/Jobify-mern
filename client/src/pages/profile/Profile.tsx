import {
  ActionFunction,
  Form,
  useNavigation,
  useOutletContext,
} from 'react-router-dom';
import Wrapper from '../add-job/add-job.styles';
import { FormRow } from '../../components';
import { toast } from 'react-toastify';
import apiClient from '../../utils/apiClient';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  //const file = formData.get('avatar');
  // if (file && file.size > 500000) {
  //   toast.error('Image size too large');
  //   return null;
  // }
  try {
    await apiClient.patch('/users/update-user', formData);
    toast.success('Profile updated successfully');
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const Profile: React.FC<any> = () => {
  const { user } = useOutletContext() as any;
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method="post" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'save changes'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;

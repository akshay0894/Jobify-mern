import {
  ActionFunction,
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import Wrapper from "./add-job.styles";
import { FormRow, FormRowSelect } from "../../components";
import { JobStatus, JobType } from "../../constants/constants";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

export const action: ActionFunction = async ({request}) =>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await apiClient.post('/jobs',data);
    toast.success('Job added successfully');
      return redirect('all-jobs');;
  } catch(error:any) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

const AddJob: React.FC<any> = () => {
  const { user } = useOutletContext<{ user: any }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={JobStatus.pending}
            list={Object.values(JobStatus)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={JobType.fullTime}
            list={Object.values(JobType)}
          />
          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;

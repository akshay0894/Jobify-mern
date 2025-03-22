import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
  useNavigation,
  useParams,
} from "react-router-dom";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";
import Wrapper from "../add-job/add-job.styles";
import { FormRow, FormRowSelect } from "../../components";
import { JobStatus, JobType } from "../../constants/constants";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const { data } = await apiClient.get(`/jobs/${params.id}`);
    return data;
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-jobs");
  }
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await apiClient.patch(`/jobs/${params.id}`, data);
    toast.success("Job edited successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error: any) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditJob: React.FC<any> = () => {
  const params = useParams();
  console.log(params);
  const { job } = useLoaderData() as any;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />

          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(JobStatus)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
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

export default EditJob;

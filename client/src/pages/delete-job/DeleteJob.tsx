import { ActionFunction, redirect } from 'react-router-dom';

import { toast } from 'react-toastify';
import apiClient from '../../utils/apiClient';

export const  action: ActionFunction =  async ({ params }) => {
  try {
    await apiClient.delete(`/jobs/${params.id}`);
    toast.success('Job deleted successfully');
  } catch (error:any) {
    toast.error(error.response.data.msg);
  }
  return redirect('/dashboard/all-jobs');
}
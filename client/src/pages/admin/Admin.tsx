import { LoaderFunction, redirect, useLoaderData } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";
import StatItem from "../../components/StatItem/StatItem";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import Wrapper from "./admin.styles";



export const loader: LoaderFunction = async() =>{
  try {
    const response = await apiClient.get('/users/admin/app-stats');
    return response.data;
  }catch {
    toast.error('You are not authorized to view this page');
    return redirect('/dashboard');
  }

}

 const Admin: React.FC<any> = () => {
  const {users, jobs} = useLoaderData() as any;
    return (
      <Wrapper>
      <StatItem
        title='current users'
        count={users}
        color='#e9b949'
        bcg='#fcefc7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total jobs'
        count={jobs}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
    );
  }


  export default Admin;
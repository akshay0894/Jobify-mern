import { Outlet } from "react-router-dom";

const HomeLayout: React.FC<any> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default HomeLayout;

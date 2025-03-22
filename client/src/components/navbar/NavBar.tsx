import { FaAlignLeft } from "react-icons/fa";
import { useDashboardContext } from "../../context/DashBoardContext";
import Logo from "../logo/Logo";
import Wrapper from "./NavBar.styles";
import LogoutContainer from "../logout-container/LogoutContainer";
import ThemeToogle from "../theme-toggle/ThemeToggle";

const NavBar: React.FC = () => {
  const { toggleSideBar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSideBar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
       
        <div className="btn-container">
        <ThemeToogle/>
            <LogoutContainer/>
            </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;

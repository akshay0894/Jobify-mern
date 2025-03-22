import { FaTimes } from "react-icons/fa";
import { useDashboardContext } from "../../context/DashBoardContext";
import Wrapper from "./SmallSideBar.styles";
import Logo from "../logo/Logo";
import NavLinks from "../NavLinks/NavLinks";

const SmallSideBar: React.FC = () => {
  const { showSidebar, toggleSideBar } = useDashboardContext();
  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? "show-sidebar" : ""}`}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSideBar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks/>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;

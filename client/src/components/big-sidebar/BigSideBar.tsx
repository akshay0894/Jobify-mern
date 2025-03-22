import { useDashboardContext } from "../../context/DashBoardContext";
import Logo from "../logo/Logo";
import NavLinks from "../NavLinks/NavLinks";
import Wrapper from "./BigSideBar.styles";

const BigSideBar: React.FC = () => {
    const {showSidebar} = useDashboardContext();

    return (<Wrapper>
        <div className={`sidebar-container ${showSidebar ? '':'show-sidebar'}`}>
            <div className="content">
                <header>
                    <Logo />
                </header>
                <NavLinks isBigSidebar />
            </div>
        </div>
       </Wrapper>);
}

export default BigSideBar;
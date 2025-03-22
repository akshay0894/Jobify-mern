import { useState } from "react";
import { useDashboardContext } from "../../context/DashBoardContext";
import Wrapper from "./LogoutContainer.styles";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";


const LogoutContainer: React.FC = () =>{

    const [showLogout, setShowLogout] = useState(false);
    const { user, logoutUser } = useDashboardContext();

    return (
        <Wrapper>
            <button type='button' className="btn logout-btn"
             onClick={()=> setShowLogout(!showLogout)}
            >
                <FaUserCircle />
                {user?.name}
                <FaCaretDown />
            </button>
            <div className={showLogout ? 'dropdown show-dropdown': 'dropdown'}>
                <button type='button' className='dropdown-btn' onClick={logoutUser}>logout</button>
            </div>
        </Wrapper>
    )

};

export default LogoutContainer;
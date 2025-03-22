import { useDashboardContext } from "../../context/DashBoardContext";
import links from "../../utils/Links";
import { NavLink } from "react-router-dom";

const NavLinks: React.FC<{ isBigSidebar?: boolean }> = ({ isBigSidebar }) => {
  const { user, toggleSideBar } = useDashboardContext();
  const { role } = user;
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        // admin user
        if (role !== "admin" && path === "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            onClick={isBigSidebar ? () => {} : toggleSideBar}
            className="nav-link"
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;

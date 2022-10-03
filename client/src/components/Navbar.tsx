import { NavLink } from "react-router-dom";
import { PrivateRoutes } from "../models";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.HOME}`}
            className={({ isActive }) =>
              isActive ? `text-blue-400` : `text-red-400`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.DASHBOARD}`}
            className={({ isActive }) =>
              isActive ? `text-blue-400` : `text-red-400`
            }
          >
            Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;

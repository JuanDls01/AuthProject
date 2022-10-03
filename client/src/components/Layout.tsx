import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Layout;

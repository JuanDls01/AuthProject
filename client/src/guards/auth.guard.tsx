import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AppStore } from "../redux/store";
import { PublicRoutes, Roles } from "../models";

interface Props {
  allowedRol?: Roles;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={PublicRoutes.LOGIN} />;

export const AuthGuard = ({ allowedRol }: Props) => {
  // Se ejecuta cada vez que se intente ingresar a una ruta privada, y verifica que en el store haya un usuario,
  const userState = useSelector((store: AppStore) => store.user);

  console.log("authguard", userState);
  return allowedRol ? (
    userState.group === allowedRol ? (
      <Outlet />
    ) : (
      <Navigate replace to={PublicRoutes.LOGIN} />
    )
  ) : userState.first_name ? (
    <Outlet />
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  );
};

export default AuthGuard;

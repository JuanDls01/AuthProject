import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../models";
import { AppStore } from "../redux/store"

interface Props {
    privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />
const PublicValidationFragment = <Navigate replace to={PublicRoutes.LOGIN} />

export const AuthGuard = ({privateValidation}: Props) => {
    // Se ejecuta cada vez que se intente ingresar a una ruta privada, y verifica que en el store haya un usuario,
    
    const userState = useSelector((store: AppStore) => store.user);
    return userState.name? (
        privateValidation? (
            PrivateValidationFragment
        ) : (
            PublicValidationFragment
        )
    ) : (
        <Navigate replace to={PublicRoutes.LOGIN} />
    )
}

export default AuthGuard;
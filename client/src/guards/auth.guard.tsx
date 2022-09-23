import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useAsync } from "../hooks";
import { AxiosResponse } from "axios";
import {
  LocalStorageKey,
  PrivateRoutes,
  PublicRoutes,
  Tokens,
  UserInfo,
} from "../models";
import { createUser } from "../redux/states/user";
import { AppStore } from "../redux/store";
import { getUserInfoWithJWT } from "../services";

interface Props {
  privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={PublicRoutes.LOGIN} />;

export const AuthGuard = ({ privateValidation }: Props) => {
  // Se ejecuta cada vez que se intente ingresar a una ruta privada, y verifica que en el store haya un usuario,
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const userState = useSelector((store: AppStore) => store.user);
  useEffect(() => {
    setLoading(true);
    const tokens: Tokens = localStorage.getItem(LocalStorageKey.TOKENS)
      ? JSON.parse(localStorage.getItem(LocalStorageKey.TOKENS) as string)
      : null;
    getUserInfoWithJWT(tokens).then((result) => {
      dispatch(createUser(result));

      setLoading(false);
    });
  }, [dispatch]);

  console.log(userState, !loading);
  return !loading && !userState.first_name ? (
    <Navigate replace to={PublicRoutes.LOGIN} />
  ) : privateValidation ? (
    PrivateValidationFragment
  ) : (
    PublicValidationFragment
  );
};

export default AuthGuard;

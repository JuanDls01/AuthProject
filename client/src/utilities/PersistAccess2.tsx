import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider.context";
import { LocalStorageKey, PrivateRoutes, refresh } from "../models";
import { createUser } from "../redux/states/user";
import { AppStore } from "../redux/store";
import { getUserInfoWithJWT, refreshToken } from "../services";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const PersistAccess2 = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const { access, setAccess } = useAuthContext();
  const refresh: refresh | null = !localStorage.getItem(
    LocalStorageKey.REFRESH_TOKEN
  )
    ? ""
    : localStorage.getItem(LocalStorageKey.REFRESH_TOKEN);
  const userState = useSelector((store: AppStore) => store.user);
  console.log(access, userState);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async (refresh: string) => {
      try {
        console.log("refresh", refresh);
        await refreshToken(refresh).then((newAccess) => {
          console.log("newAccess", newAccess);
          setAccess(newAccess);
        });
      } catch (err) {
        console.log("verifyRefreshToken Error", err);
      } finally {
        isMounted && setIsLoading(false);
        console.log(isLoading);
      }
    };

    const saveUserInfoOnRedux = async () => {
      try {
        console.log(access);
        await getUserInfoWithJWT(access).then((res) => {
          dispatch(createUser(res));
        });
      } catch (err) {
        // Si el error es porque expiro el token, probar con verifyRefreshToken()
        console.log("saveUserInfoOnRedux Error", err);
      } finally {
        isMounted && setIsLoading(false);
        console.log(isLoading);
      }
    };

    // Si no tengo usuario y tengo access token -> traigo info del usuario
    !userState.first_name && access
      ? saveUserInfoOnRedux()
      : // Si no tengo access y tengo refresh -> pruebo refrescando el token
      !access && refresh
      ? verifyRefreshToken(refresh)
      : // Si no tengo usuario, access ni refresh -> no hago nada chau!
        setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [access]);

  return (
    <>
      {isLoading ? (
        <>CARGANDO PERSIST ACCESS</>
      ) : (
        // { children }
        <Outlet />
      )}
    </>
  );
};
export default PersistAccess2;

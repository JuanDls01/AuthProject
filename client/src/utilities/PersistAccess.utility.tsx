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

const PersistAccess = () => {
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

    const verifyRefreshToken = async () => {
      try {
        refresh &&
          (await refreshToken(refresh)
            .then((newAccess) => {
              setAccess(newAccess);
              return getUserInfoWithJWT(newAccess);
            })
            .then((user) => {
              dispatch(createUser(user));
            }));
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    access ? setIsLoading(false) : verifyRefreshToken();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <>CARGANDO PERSIST ACCESS</>
      ) : (
        // <Navigate to={PrivateRoutes.PRIVATE} />
        <Outlet />
      )}
    </>
  );
};
export default PersistAccess;

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Outlet } from "react-router-dom";
// import { LocalStorageKey, Tokens } from "../models";
// import { AppStore } from "../redux/store";

// const PersistLogin = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const userState = useSelector((store: AppStore) => store.user);

//   const tokens: Tokens = localStorage.getItem(LocalStorageKey.TOKENS)
//     ? JSON.parse(localStorage.getItem(LocalStorageKey.TOKENS) as string)
//     : null;

//   useEffect(() => {
//     let isMounted = true;

//     const verifyRefreshToken = async () => {
//       try {
//         await refresh();
//       } catch (err) {
//         console.log(err);
//       } finally {
//         isMounted && setIsLoading(false);
//       }
//     };

//     // Si no tengo usuario, pero tengo el token en localStorage:
//     !userState.first_name && tokens
//       ? verifyRefreshToken()
//       : setIsLoading(false);

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return <>{!tokens ? <Outlet /> : isLoading ? <>CARGANDO</> : <Outlet />}</>;
// };
// export default PersistLogin;

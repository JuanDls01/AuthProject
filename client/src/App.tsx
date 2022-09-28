import { Suspense, lazy, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import {
  LocalStorageKey,
  PrivateRoutes,
  PublicRoutes,
  Roles,
  Tokens,
  UserInfo,
} from "./models";

import { RoutesWithNotFound } from "./utilities";
import { AuthGuard, RolGuard } from "./guards";

const Login = lazy(() => import("./pages/Login/Login"));
const Private = lazy(() => import("./pages/Private/Private"));
const Dashboard = lazy(() => import("./pages/Private/Dashboard/Dashboard"));

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<>CARGANDO</>}>
        {/* <Provider store={store}> */}
        <BrowserRouter>
          <RoutesWithNotFound>
            {/* By default we send the user to the private routes */}
            <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE} />} />

            {/* Public Routes: */}
            <Route path={PublicRoutes.LOGIN} element={<Login />} />

            {/* Private Routes: */}
            <Route element={<AuthGuard privateValidation={true} />}>
              <Route
                path={`${PrivateRoutes.PRIVATE}/*`}
                element={<Private />}
              />
            </Route>
            <Route element={<RolGuard rol={Roles.ADMIN} />}>
              <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
        {/* </Provider> */}
      </Suspense>
    </div>
  );
}

export default App;

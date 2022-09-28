import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { PrivateRoutes, PublicRoutes, Roles } from "./models";

import { PersistAccess, RoutesWithNotFound } from "./utilities";
import { AuthGuard, RolGuard } from "./guards";

const Login = lazy(() => import("./pages/Login/Login"));
const Private = lazy(() => import("./pages/Private/Private"));
const Dashboard = lazy(() => import("./pages/Private/Dashboard/Dashboard"));

function App() {
  return (
    <div className='App'>
      {/* <PersistAccess> */}
      <Suspense fallback={<>CARGANDO</>}>
        <BrowserRouter>
          <RoutesWithNotFound>
            {/* By default we send the user to the private routes */}
            <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE} />} />
            {/* Public Routes: */}
            <Route path={PublicRoutes.LOGIN} element={<Login />} />
            <Route element={<PersistAccess />}>
              {/* Private Routes: */}
              <Route element={<AuthGuard />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
              <Route element={<AuthGuard allowedRol={Roles.ADMIN} />}>
                <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
              </Route>
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
      </Suspense>
      {/* </PersistAccess> */}
    </div>
  );
}

export default App;

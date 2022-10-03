import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes, Roles } from "./models";

import { PersistAccess, RoutesWithNotFound } from "./utilities";
import { AuthGuard, RolGuard } from "./guards";
import { Layout } from "./components";

const Login = lazy(() => import("./pages/Login/Login"));
const Private = lazy(() => import("./pages/Private/Private"));
const Dashboard = lazy(() => import("./pages/Private/Dashboard/Dashboard"));

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<>CARGANDO</>}>
        <BrowserRouter>
          <RoutesWithNotFound>
            <Route element={<Layout />}>
              <Route element={<PersistAccess />}>
                {/* <Route path='/' element={<Layout />}> */}
                {/* By default we send the user to the private routes */}
                <Route
                  path='/'
                  element={<Navigate to={PrivateRoutes.PRIVATE} />}
                />

                {/* Public Routes: */}
                <Route path={PublicRoutes.LOGIN} element={<Login />} />
                {/* <Route path={PublicRoutes.REGISTER} element={<Register />} /> */}

                {/* Private Routes: */}
                {/* <Route element={<PersistAccess />}> */}
                <Route element={<AuthGuard />}>
                  <Route
                    path={`${PrivateRoutes.PRIVATE}/*`}
                    element={<Private />}
                  />
                </Route>
                {/* </Route> */}
              </Route>
              {/* </Route> */}
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;

import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes, Roles } from "./models";

import { PersistAccess, RoutesWithNotFound } from "./utilities";
import { AuthGuard, RolGuard } from "./guards";
import { Layout } from "./components";

const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Private/Home/Home"));
const Dashboard = lazy(() => import("./pages/Private/Dashboard/Dashboard"));

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<>CARGANDO</>}>
        <BrowserRouter>
          <RoutesWithNotFound>
            <Route element={<Layout />}>
              <Route element={<PersistAccess />}>
                {/* By default we send the user to the private routes */}
                <Route
                  path='/'
                  element={<Navigate to={PrivateRoutes.HOME} />}
                />

                {/* Public Routes: */}
                <Route path={PublicRoutes.LOGIN} element={<Login />} />
                {/* <Route path={PublicRoutes.REGISTER} element={<Register />} /> */}

                {/* Private Routes: */}
                <Route element={<AuthGuard />}>
                  <Route
                    path={PrivateRoutes.DASHBOARD}
                    element={<Dashboard />}
                  />
                  <Route path={PrivateRoutes.HOME} element={<Home />} />
                </Route>
              </Route>
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;

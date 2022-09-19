import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Navigate, Route} from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './models';
import { AuthGuard } from './guards';
import { RoutesWithNotFound } from './utilities';
// import { Login } from './pages/Login';

const Login = lazy(() => import('./pages/Login/Login'))
const Private = lazy(() => import('./pages/Private/Private'))

function App() {
  return (
    <div className="App">
      <Suspense fallback={<>CARGANDO</>}>
        <Provider store={store}>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE} />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route element={<AuthGuard />}>
                <Route path={`${PrivateRoutes.DASHBOARD}/*`} element={<Private />} />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </div>
  )
}

export default App;

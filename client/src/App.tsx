import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Private } from './pages/Private'
import { Login } from './pages/Login'
import { PrivateRoutes, PublicRoutes } from './models';
import { AuthGuard } from './guards';
import { RoutesWithNotFound } from './utilities';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <RoutesWithNotFound>
            <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE} />} />
            <Route path='*' element={<>NOT FOUND</>} />
            <Route path={PublicRoutes.LOGIN} element={<Login />} />
            <Route element={<AuthGuard />}>
              <Route path={`${PrivateRoutes.DASHBOARD}/*`} element={<Private />} />
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App;

import { lazy } from "react"
import { Navigate, Route } from "react-router-dom"
import { PrivateRoutes } from "../../models"
import { RoutesWithNotFound } from "../../utilities"

// Utilizamos lazy loading en el componente padre de cada ruta:
const Dashboard = lazy(()=> import('./Dashboard/Dashboard'));
const Home = lazy(()=> import('./Home/Home'));

function Private() {
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={PrivateRoutes.DASHBOARD}/>}/>
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />}/>
      <Route path={PrivateRoutes.HOME} element={<Home />} />
    </RoutesWithNotFound>
  )
};

export default Private;
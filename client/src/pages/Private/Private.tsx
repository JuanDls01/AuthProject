import { Navigate, Route } from "react-router-dom"
import { PrivateRoutes } from "../../models"
import { RoutesWithNotFound } from "../../utilities"
import { Dashboard } from "./Dashboard"
import Home from "./Home/Home"

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
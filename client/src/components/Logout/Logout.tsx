import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LocalStorageKey, PublicRoutes } from "../../models";
import { resetUser } from "../../redux/states/user";
import { clearLocalStorage } from "../../utilities";

function Logout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logOut = () => {
    // clearLocalStorage(LocalStorageKey.TOKEN);
    // clearLocalStorage(LocalStorageKey.REFRESH_TOKEN)
    dispatch(resetUser())
    navigate(`${PublicRoutes.LOGIN}`, {replace: true});
  };
  return (
    <button onClick={logOut}>Log Out</button>
  )
};

export default Logout;
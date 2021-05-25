import { Redirect, Route } from "react-router";
import cookie from "js-cookie";
const PrivateRoute = ({ ...rest }) => {
  let auth;
  if (process.browser) {
    if (cookie.get("token")) {
      auth = JSON.parse(window.localStorage.getItem("auth"));
    } else {
      window.localStorage.removeItem("auth");
    }
  }

  return auth && auth.token ? <Route {...rest} /> : <Redirect to="/login" />;
};
export default PrivateRoute;

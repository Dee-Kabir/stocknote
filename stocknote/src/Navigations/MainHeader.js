import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Divider, Menu } from "semantic-ui-react";
import { isAuthenticated, removeCookie } from "../actions/auth";
import SearchForm from "../components/SearchForm";

const MainHeader = () => {
  const [currentpath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    setPath();
  }, []);
  const setPath = () => {
    setCurrentPath(window.location.pathname);
  };
  const checkPath = () => {
    if (currentpath === "/") {
      return true;
    }
    return false;
  };
  const logout = () => {
    if (window.localStorage.getItem("auth"))
      window.localStorage.removeItem("auth");
    removeCookie("token");
    sessionStorage.clear();
  };
  return (
    <Menu style={{ width: "100%" }}>
      <Menu.Item as={Link} to="/">
        Home
      </Menu.Item>
      <Divider />
      <Menu.Item as={Link} to="/my-stocks">
        My Stocks
      </Menu.Item>
      <Menu.Item as={Link} to="/new">
        New stock
      </Menu.Item>

      <Menu.Menu position="right">
        {isAuthenticated() && (
          <Fragment>
            {!checkPath() && (
              <Menu.Item
                id="searchbar"
                style={{ paddingTop: "4px", paddingBottom: "4px" }}
              >
                <SearchForm showError={false} />
              </Menu.Item>
            )}
            <Menu.Item as={Link} to="/login" onClick={logout}>
              Logout
            </Menu.Item>
          </Fragment>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <Menu.Item>Sign in</Menu.Item>
          </Fragment>
        )}
      </Menu.Menu>
    </Menu>
  );
};
export default MainHeader;

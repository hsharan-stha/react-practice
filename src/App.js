import { Redirect } from "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./auth/login";
import Register from "./auth/register";
import Home from "./featured/home";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { loginAction, logoutAction } from "./store/action";
import { useDispatch } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const token = useSelector((state) => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loginAction());
    } else {
      dispatch(logoutAction());
    }
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        {token ? (
          <>
            <Route exact path="/home" component={Home}></Route>
            <Redirect from="*" to="/home"></Redirect>
          </>
        ) : (
          <>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Redirect from="*" to="/login"></Redirect>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

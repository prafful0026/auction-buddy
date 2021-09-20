import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import Profile from "./Home";
import { useAuth0 } from "@auth0/auth0-react";
import { authAtom } from "./RecoilStore/AuthStore";
import { useSetRecoilState } from "recoil";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Yo from "./Yo";

const App = () => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const setAuth = useSetRecoilState(authAtom);

  useEffect(() => {
    const getToken = async () => {
      const tokenClaims = await getIdTokenClaims();
      const token = tokenClaims.__raw;
      setAuth(token);
    };

    isAuthenticated && getToken();
  }, [isAuthenticated]);
  return (
    <div className='App'>
      <header>
        <NavBar />
      </header>
      <Switch>
        <PrivateRoute path='/' component={Profile} exact />
        {/* <PrivateRoute path='/profile' component={Profile} exact /> */}
      </Switch>
    </div>
  );
};
export default App;

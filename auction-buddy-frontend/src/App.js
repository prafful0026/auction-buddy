import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import Profile from "./Home";
import { useAuth0 } from "@auth0/auth0-react";
import { authAtom } from "./RecoilStore/AuthStore";
import { useRecoilState } from "recoil";
import PrivateRoute from "./components/PrivateRoute";
import Yo from "./Yo";

const App = () => {
  const { isLoading, isAuthenticated, getIdTokenClaims } = useAuth0();
  const [auth, setAuth] = useRecoilState(authAtom);

  useEffect(() => {
    const getToken = async () => {
      const tokenClaims = await getIdTokenClaims();
      const token = tokenClaims.__raw;
      setAuth(token);
    };

    isAuthenticated && getToken();
  }, [isAuthenticated]);
  console.log(auth);
  return (
    <Switch>
      <PrivateRoute path='/' component={Yo} exact />
      <PrivateRoute path='/profile' component={Profile} exact />
    </Switch>
  );
};
export default App;

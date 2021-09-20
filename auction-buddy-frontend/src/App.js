import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { authAtom } from "./RecoilStore/AuthStore";
import { useSetRecoilState } from "recoil";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import AuctionsPage from "./pages/AuctionsPage";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className='App'>
        <header>
          <NavBar />
        </header>
        <Switch>
          <PrivateRoute path='/' component={AuctionsPage} exact />
        </Switch>
      </div>
    </ErrorBoundary>
  );
};
export default App;

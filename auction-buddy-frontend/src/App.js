import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { authAtom } from "./RecoilStore/AuthStore";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  auctionsAtom,
  fetchAuctionsErrorAtom,
  fetchAuctionsLoadingAtom,
} from "./RecoilStore/AuctionStore";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import AuctionsPage from "./pages/AuctionsPage";
import { ErrorBoundary } from "react-error-boundary";
import CreateAuctionPage from "./pages/CreateAuctionPage";
import { fetchAuctions } from "./utils/fetchAuctions";
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
  const { isAuthenticated, getIdTokenClaims,isLoading } = useAuth0();
  const [auth, setAuth] = useRecoilState(authAtom);
  const setAuctions = useSetRecoilState(auctionsAtom);
  const setError = useSetRecoilState(fetchAuctionsErrorAtom);
  const setLoading = useSetRecoilState(fetchAuctionsLoadingAtom);

  useEffect(() => {
    const getToken = async () => {
      const tokenClaims = await getIdTokenClaims();
      const token = tokenClaims.__raw;
      setAuth(token);
    };
    isAuthenticated && getToken();
  }, [isAuthenticated, getIdTokenClaims, setAuth]);
  useEffect(() => {
    (async () => {
      await fetchAuctions(setError, setLoading, auth, setAuctions);
    })();
  }, [auth, setError, setLoading, setAuctions]);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className='App'>
        <header>
          {isAuthenticated && !isLoading && <NavBar />}
        </header>
        <Switch>
          <PrivateRoute path='/' component={AuctionsPage} exact />
          <PrivateRoute path='/create' component={CreateAuctionPage} exact />
        </Switch>
      </div>
    </ErrorBoundary>
  );
};
export default App;

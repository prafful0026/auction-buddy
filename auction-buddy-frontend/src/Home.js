import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Auctions from "./pages/Auctions";
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
const Home = () => {
  const { logout, user } = useAuth0();
  return (
    <div>
      <div>
        Hello {user.name}
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
      hi hello
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Auctions />
      </ErrorBoundary>
    </div>
  );
};

export default Home;

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./components/auth0-provider-with-history";
import "./style.scss";
import "./normalize.scss";

ReactDOM.render(
  <Router>
    <RecoilRoot>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </RecoilRoot>
  </Router>,
  document.getElementById("root")
);

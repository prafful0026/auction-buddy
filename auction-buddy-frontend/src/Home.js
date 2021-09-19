import React, { useEffect, Suspense } from "react";
// import { useAuth0, logout } from "@a";
import { useAuth0 } from "@auth0/auth0-react";
import { authAtom } from "./RecoilStore/AuthStore";
import { useRecoilState} from "recoil";
import Auctions from "./components/Auctions";
const Home = () => {
  const { logout, user, getAccessTokenSilently } = useAuth0();
  // const [auth, setAuth] = useRecoilState(authAtom);
  console.log("in home");
  // useEffect(async () => {
  //   if (!auth.user || !auth.token) {
  //     const obj = await getAccessTokenSilently();
  //     // console.log(obj);
  //     setAuth((state) => ({ ...state, obj }));
  //   }
  // }, []);
  return (
    <div>
      <div>
        Hello {user.name}
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
      hi hello
      {/* <ErrorBoundary> */}
      {/* <Suspense fallback={<>yyoidcq  e uioqw </>}> */}
      <Auctions />
      {/* </Suspense> */}
    </div>
  );
};

export default Home;

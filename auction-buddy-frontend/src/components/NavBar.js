import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    background: 'linear-gradient(90deg, rgba(190,52,32,1) 0%, rgba(231,75,77,1) 48%, rgba(231,148,74,1) 100%)',
    padding: 14,
    marginBottom: 24,
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
  },
  header: {
    flexBasis: '50%',
    display: 'flex'
  },
  loginLogoutContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexBasis: '50%',
  },
  button: {
    color: 'white',
  },
})

const NavBar = ({ authStore }) => {
  const { loginWithRedirect, logout,isAuthenticated } = useAuth0();

  const classes = useStyles();

  return (
    <div className={classes.navbar}>
      <div className={classes.header}>
        <h1 style={{ fontSize: 14, color: 'white' }}>AUCTION BUDDY</h1>
      </div>
      <div className={classes.loginLogoutContainer}>

        {isAuthenticated && (
          <Button
            className={classes.button}
            onClick={() => logout({})}
          >
            Log out
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
import React, { useEffect, useState } from 'react';
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        //setIsLoggedIn(true); 
        // setUserObj(user);
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args),
        }); 
      }else{
        setUserObj(null);
      }
      setInit(true);
    })
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj(
      // Object.assign({}, user)
      {
      displayName:user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args),
    }
    );
  };

  return ( 
  <>
  {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
  </>
  // <footer>&copy; Nwitter {new Date().getFullYear() }
  // </footer>
  );
}

export default App;

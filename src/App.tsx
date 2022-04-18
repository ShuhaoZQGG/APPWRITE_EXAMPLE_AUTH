import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import appwrite from './Appwrite';
import Login from './Components/Login';
import Profile from './Components/Profile';
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [ userprofile, setUserprofile ] = useState({});
  const [ error, setError ] = useState('');
  const [ currentpage, setCurrentpage ] = useState(false); 

  useEffect(() => {
    (async() => {
      await getUserData();
    })()
  }, [currentpage]);

  async function getUserData() {
    try {
      const response = await appwrite.account.get();
      setUserprofile(response);
    } catch (e: any) {
      if (e.toString() === 'Error: Unauthorized') return;
      setError(e.toString());
      console.error(e);
    }
  }

  async function login(email: string, password: string) {
    try {
      setError('');
      await appwrite.account.createSession(email, password);
      await getUserData();
    } catch (e: any) {
      setError(e.toString());
      console.error(e);
    }
  }

  async function register(email: string, password: string){
    try {
      // Set error to false so if we are successful the error doesn't perist making bad UX Design.
      // also set the loading prop to true to signal to the user we are processing his request.
      setError('')

      // Create the account, if this fails it will error and be caught by the catch(err).
      await appwrite.account.create(
        "unique()",
        email,
        password
      );

      setError('Register Successful');
    }  catch (e: any) {
      setError(e.toString());
      // If registration fails then show user the registration was not successful.
      console.error(e) // also console error for debugging purposes.
    }
  }

  async function logout() {
    try {
      setUserprofile({});
      await appwrite.account.deleteSession('current');
    } catch (e: any) {
      setError(e.toString());
      console.error(e);
    }
  }

  return (
    <div className='App'>
      <div className='loginCore'>
        { userprofile && Object.keys(userprofile).length === 0 ? (
          <div className='loginPage'>
            <Login currentPage={currentpage} registerFunc={(email: string, password: string) => register(email, password)}  loginFunc={(email: string, password: string) => login(email, password)} error={() => error} />
            <div className='loginSwitchContainer'>
              <p>{currentpage ? 'Got an account?' : "Haven't got an account?"}</p>
              <span onClick={() => setCurrentpage(!currentpage)}>{currentpage ? 'Login' : 'Sign Up'}</span>
            </div>
          </div>
        ) : (
          <div className='loginPage'>
            <Profile userprofile={userprofile} logout={() => logout()} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

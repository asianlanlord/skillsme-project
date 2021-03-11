import './App.css';
import fire from './fire';
import { useState, useEffect } from 'react';
import { Redirect, BrowserRouter as Router, Switch, Route } from "react-router-dom";


import HomePage from './Components/HomePage';
import NavBar from './Components/NavBar.js';
import LoginPage from './Components/LoginPage';
import PostPage from './Components/PostPage';
import DiscussionPage from './Components/DiscussionPage';


function App() {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      })
  }

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      })
  }

  const handleLogout = () => {
    fire.auth().signOut();
  }

  const getEmail = () =>{
    var currentUser = fire.auth().currentUser;
    setCurrentUser(currentUser.email) 
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs();
        setUser(user);
        getEmail();
      } else {
        setUser('');
      }
    })
  }

  useEffect(() => {
    authListener();
  }, [])

  return (
    <Router>
      <NavBar user={user} handleLogout={handleLogout} email={currentUser}/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/post" component={PostPage} />
        <Route exact path="/discussion/:id" component={DiscussionPage} />
        <Route exact path="/login" render={() => !user ?
            <LoginPage email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError} /> : <Redirect to="/" />} />
      </Switch>
    
    </Router>
  );
}

export default App;

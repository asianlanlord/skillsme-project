import './App.css';
import { useState, useEffect } from 'react';
import { Redirect, BrowserRouter as Router, Switch, Route } from "react-router-dom";


import HomePage from './Components/HomePage';
import NavBar from './Components/NavBar.js';
import LoginPage from './Components/LoginPage';
import UserPage from './Components/UserPage';
import DiscussionPage from './Components/DiscussionPage';


function App() {

  // const [user, setUser] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  // const [hasAccount, setHasAccount] = useState(false);

  // const clearInputs = () => {
  //   setEmail('');
  //   setPassword('');
  // }

  // const clearErrors = () => {
  //   setEmailError('');
  //   setPasswordError('');
  // }

  // const handleLogin = () => {
  //   clearErrors();
  //   fire
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .catch(err => {
  //       switch (err.code) {
  //         case "auth/invalid-email":
  //         case "auth/user-disabled":
  //         case "auth/user-not-found":
  //           setEmailError(err.message);
  //           break;
  //         case "auth/wrong-password":
  //           setPasswordError(err.message);
  //           break;
  //       }
  //     })
  // }

  // const handleSignup = () => {
  //   clearErrors();
  //   fire
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .catch(err => {
  //       switch (err.code) {
  //         case "auth/email-already-in-use":
  //         case "auth/invalid-email":
  //           setEmailError(err.message);
  //           break;
  //         case "auth/weak-password":
  //           setPasswordError(err.message);
  //           break;
  //       }
  //     })
  // }

  // const handleLogout = () => {
  //   fire.auth().signOut();
  // }

  // const authListener = () => {
  //   fire.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       clearInputs();
  //       setUser(user);
  //     } else {
  //       setUser('');
  //     }
  //   })
  // }

  // useEffect(() => {
  //   authListener();
  // }, [])

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/user" component={UserPage} />
        <Route exact path="/discussion/:id" component={DiscussionPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    
    </Router>
  );
}

export default App;

//import page component
import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Routes, Route, Outlet, Link } from 'react-router-dom';

//import page component
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { SignUp } from './pages/Signup'

//import firebase 
import { initializeApp } from "firebase/app";
import { FirebaseConfig } from "./config/FirebaseConfig"
//import { getAnalytics } from "firebase/analytics";

//import firebase auth
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

//initialise Firebase
const FBapp = initializeApp(FirebaseConfig)

//initialise firebase authentificaton
const FBauth = getAuth(FBapp)




//function to create user account
const signup = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => resolve(userCredential.user))
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

const NavData = [
  { name: "Home", path: "/", public: true },
  { name: "About", path: "/about", public: true },
  { name: "Contact", path: "/contact", public: true },
  { name: "Sign Up", path: "/signup", public: true }

]

function App() {
  const [auth, setauth] = useState()

  //an observer to determine user authentification status
  onAuthStateChanged(FBauth, (user) => {
    if (user) {
      //visitor is authneticated
      setauth(user)
    }
    else {
      //if user is null means visitor is not authwenticated
      setauth(null)
    }
  })

  return (
    <div className="App">
      <Header title="My app" headernav={NavData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp handler={signup} />} />
      </Routes>
      <Footer year="2022" />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { Route, Routes, Link, useNavigate } from 'react-router-dom';

function App() {
  const [state, setState] = useState({
    isLoggedIn: false,
    token: "",
    userId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    var loggedIn = localStorage.getItem("isLoggedIn") === "true" ? true : false;
    var token = localStorage.getItem("token");
    setState((prevState) => { 
      return {
        ...prevState,
        isLoggedIn: loggedIn
      }
    });
  }, []);

  const loginHandler = (credentials) => {
    fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
      method: "POST",
      headers: {
				'Content-Type': 'application/json',
			},
      body: JSON.stringify(credentials),
    })
    .then(async res => {
      return {
        ...await res.json(),
        status: res.status
      }
    })
    .then(resData => {
      
      // localStorage.setItem("isLoggedIn", true);
      // setState((prevState) => {
      //   return {
      //     ...prevState,
      //     isLoggedIn: true,
      //   }
      // });
      navigate("/");
    })
    .catch(err => {
      console.log(err)
    });
  }

  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", false);
    setState((prevState) => {
      return {
        ...prevState,
        isLoggedIn: false,
      }
    });
    navigate("/");
  }

  return (
    <>
      <NavBar title="DevJournal">
        {!state.isLoggedIn && <Link to="/login">Login</Link>}
        {state.isLoggedIn && <Link to="/logout">Logout</Link>}
      </NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={loginHandler}/>} />
        <Route path="/logout" element={<Logout onLogout={logoutHandler}/>} />
      </Routes>
    </>
  );
}

export default App;

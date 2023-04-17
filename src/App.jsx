import React, { useState, useEffect, Suspense } from "react";
import NavBar from "./components/NavBar/NavBar";
import NotificationList from "./components/UI/Notification/NotificationList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Loader from './components/UI/Loader/Loader';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';

function App() {
  const [state, setState] = useState({
    isLoggedIn: false,
    token: null,
    userId: null,
    expires: null,
    notification: null
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    var loggedIn = localStorage.getItem("isLoggedIn") === "true" ? true : false;
    var token = localStorage.getItem("token");
    var userId = localStorage.getItem("userId");
    var expiry = localStorage.getItem("expires");
    if (expiry) {
      expiry = expiry.toString();
    }
    var expires = new Date(expiry);
    const now = new Date();

    if ((!loggedIn || expires < now) && !location.pathname.includes("register")) {
      setState((prevState) => {
        return {
          ...prevState,
          isLoggedIn: false,
          token: null,
          userId: null,
          expires: null,
        }
      });
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expires");
      navigate("/login");
    }
    setState((prevState) => {
      return {
        ...prevState,
        isLoggedIn: loggedIn,
        token: token,
        userId: userId,
        expires: expires,
      }
    });
  }, [navigate, location.pathname]);

  const registerHandler = (credentials) => {
    fetch(`${process.env.REACT_APP_API_URL}/user/new`, {
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
        if (resData.status !== 201) {
          notificationHandler({ title: "Error Occurred", type: "error", message: resData.message });
          return;
        }

        notificationHandler({ title: "Registered", type: "success", message: "You have successfully created your account!" });

        loginHandler(credentials);
      })
      .catch(err => {
        notificationHandler({ title: "Error Occurred", type: "error", message: err });
      });
  }

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
        if (resData.status !== 200) {
          notificationHandler({ title: "Error Occurred", type: "error", message: resData.message });
          return;
        }
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("expires", resData.expires);
        var expiry = new Date(resData.expires);
        setState((prevState) => {
          return {
            ...prevState,
            isLoggedIn: true,
            token: resData.token,
            userId: resData.userId,
            expires: expiry,
          }
        });
        navigate("/");
        notificationHandler({ title: "Logged In", type: "success", message: "You have been successfully logged in!" });
      })
      .catch(err => {
        console.log(err)
      });
  }

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expires");

    setState((prevState) => {
      return {
        ...prevState,
        isLoggedIn: false,
        token: null,
        userId: null,
        expires: "test",
      }
    });
    notificationHandler({ title: "Logged Out", type: "success", message: "You have been successfully logged out." });
    navigate("/");
  }

  const notificationHandler = (notification) => {
    setState((prevState) => {
      return {
        ...prevState,
        notification: notification,
      }
    });
  }

  const removeNotificationHandler = () => {
    notificationHandler(null);
  }

  return (
    <>
      <NavBar title="DevJournal">
        {state.isLoggedIn && <Link to="/logout">Logout</Link>}
      </NavBar>
      <NotificationList notification={state.notification} removeNotification={removeNotificationHandler} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={loginHandler} />} />
          <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
          <Route path="/register" element={<Register onRegister={registerHandler} />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

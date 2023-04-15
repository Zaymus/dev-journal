import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" ? true : false;
    if(!isLoggedIn) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <div>

    </div>
  );
}

export default Home;
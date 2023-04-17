import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../components/UI/Filter/Filter";
import classes from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" ? true : false;
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Journal Entries</h1>
      <div className={classes.filterContainer}>
        <Filter></Filter>
      </div>
    </div>
  );
}

export default Home;
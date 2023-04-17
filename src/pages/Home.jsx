import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../components/UI/Filter/Filter";
import classes from './Home.module.css';
import Entry from "../components/Entry/Entry";

const Home = (props) => {
  const navigate = useNavigate();
  const [entryFilter, setEntryFilter] = useState("all");
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" ? true : false;
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
  }, []);

  useEffect(() => {
    if(!props.token) return;
    fetch(`${process.env.REACT_APP_API_URL}/posts/all`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(async res => {
      return {entries: await res.json(), status: res.status}
    })
    .then(resData => {
      if(resData.status !== 200) {
        props.onNotification({title: "Error Occurred", type: "error", message: resData.message});
        return;
      }

      setEntries([...resData.entries]);
    })
    .catch(err => {
      console.log(err);
    });
  }, [props]);

  return (
    <div className={classes.container}>
      <div className={classes.headingContainer}>
        <h1 className={classes.heading}>Journal Entries</h1>
        <Filter entryFilter={entryFilter} setEntryFilter={setEntryFilter} />
      </div>
      {entries.map((entry) => {
        return <Entry date={entry.date} type={entry.type}/>
      })}
    </div>
  );
}

export default Home;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../components/UI/Filter/Filter";
import classes from './Home.module.css';
import Entry from "../components/Entry/Entry";

const Home = (props) => {
  const navigate = useNavigate();
  const [entryFilter, setEntryFilter] = useState();
  const [posts, setPosts] = useState([]);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" ? true : false;
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setEntryFilter("all");
  }, []);

  const sortEntries = (a, b) => {
    return a.date > b.date;
  }

  useEffect(() => {
    if (!props.token) return;
    fetch(`${process.env.REACT_APP_API_URL}/posts/all`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(async res => {
        const data = await res.json();
        data.sort(sortEntries);
        return { entries: data, status: res.status }
      })
      .then(resData => {
        if (resData.status !== 200) {
          props.onNotification({ title: "Error Occurred", type: "error", message: resData.message });
          return;
        }
        setEntries([...resData.entries]);
        setPosts([...resData.entries]);
      })
      .catch(err => {
        console.log(err);
        props.onNotification({ title: "Error Occurred", type: "error", message: err });
      });
  }, [props]);

  useEffect(() => {
    if (entryFilter === 'all') {
      setEntries(posts.sort(sortEntries));
    } else {
      setEntries(posts.filter((entry) => { return entry.type === entryFilter }).sort(sortEntries));
    }
  }, [entryFilter]);

  return (
    <div className={classes.container}>
      <div className={classes.headingContainer}>
        <h1 className={classes.heading}>Journal Entries</h1>
        <Filter entryFilter={entryFilter} setEntryFilter={setEntryFilter} />
      </div>
      <div className={classes.entryList}>
        {entries.map((entry) => {
          return <Entry key={entry._id} date={entry.date} type={entry.type} />
        })}
      </div>
    </div>
  );
}

export default Home;
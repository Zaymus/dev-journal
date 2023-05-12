import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../components/UI/Filter/Filter";
import classes from './Home.module.css';
import Entry from "../components/Entry/Entry";
import Popup from "../components/UI/Popup/Popup";
import EntryPopupSkeleton from "../components/Entry/EntryPopupSkeleton";

const Home = (props) => {
  const navigate = useNavigate();
  const [entryFilter, setEntryFilter] = useState();
  const [posts, setPosts] = useState([]);
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" ? true : false;
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setEntryFilter("all");
  }, []);

  const sortEntries = (a, b) => {
    if (new Date(a.date) > new Date(b.date)) {
      return -1;
    } else if (new Date(a.date) < new Date(b.date)) {
      return 1;
    }
    return 0;
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
      const filteredEntries = posts.filter((entry) => { return entry.type === entryFilter });
      setEntries(filteredEntries.sort(sortEntries));
    }
  }, [entryFilter]);

  return (
    <>
      {selectedEntry && <Popup onRemove={setSelectedEntry} className={classes.popup}><EntryPopupSkeleton entryData={selectedEntry} onRemove={setSelectedEntry} token={props.token} onNotification={props.onNotification} /></Popup>}
      <div className={classes.container}>
        <div className={classes.headingContainer}>
          <h1>Journal Entries</h1>
          <Filter entryFilter={entryFilter} setEntryFilter={setEntryFilter} />
        </div>
        <span className="line">
          <hr />
        </span>
        <div className={classes.entryList}>
          {entries.map((entry) => {
            return (
              <Entry
                key={entry._id}
                data={entry}
                onSelectedEntry={setSelectedEntry}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
import React, { useState, useEffect } from "react";
import Button from "../UI/Button/Button";
import classes from "./EntryPopupSkeleton.module.css";

const DailyLogEntry = (props) => {
  const date = props.entry.date ? new Date(props.entry.date).toDateString() : new Date().toDateString();
  const [isEditing, setIsEditing] = useState(false);
  const [startingData, setStartingData] = useState({
    _id: props.entry._id,
    editable: props.entry.editable || true,
    accomplished: props.entry.accomplished,
    didWell: props.entry.didWell,
    tomorrowTasks: props.entry.tomorrowTasks,
  });
  const [entryData, setEntryData] = useState(startingData);
  const [deleteEntry, setDeleteEntry] = useState(false);

  const closeHandler = () => {
    props.onClose();
  }

  const editHandler = () => {
    setIsEditing(true);
  }

  const saveHandler = async (event) => {
    event.preventDefault();
    const accomplished = event.target[0].value;
    const didWell = event.target[1].value;
    const tomorrowTasks = event.target[2].value;

    const url = entryData._id ? `${process.env.REACT_APP_API_URL}/posts/edit/${props.entry._id}?postType=daily-log` : `${process.env.REACT_APP_API_URL}/posts/new?type=daily-log`;

    const method = entryData._id ? 'PATCH' : 'POST';

    const result = await fetch(url, {
      method: method,
      headers: {
        "Authorization": `Bearer ${props.token}`,
        "content-type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({
        accomplished: accomplished,
        didWell: didWell,
        tomorrowTasks: tomorrowTasks,
      }),
    });
    const resData = { ...await result.json(), status: result.status }

    if (resData.status !== 200 && resData.status !== 201) {
      props.onNotification({ title: "Error Occurred", type: "error", message: resData.message });
      return;
    }

    setIsEditing(false);
    setStartingData((prevState) => {
      return {
        ...prevState,
        accomplished: accomplished,
        didWell: didWell,
        tomorrowTasks: tomorrowTasks,
      }
    });

    var notification = {
      title: "Changes Saved.",
      type: "success",
      message: resData.message
    }

    if (resData.status === 201) {
      notification = {
        title: "Entry Created.",
        type: "success",
        message: resData.message
      }
    }
    props.onNotification(notification);
  }

  const resetHandler = () => {
    if (!entryData._id) {
      closeHandler();
      return;
    }
    setEntryData(startingData);
    setIsEditing(false);
  }

  const viewableEntry = (
    <>
      <h2 className={classes.subHeading}>What I accomplished:</h2>
      <p className={classes.paragragh}>{entryData.accomplished}</p>

      <h2 className={classes.subHeading}>What I did well:</h2>
      <p className={classes.paragragh}>{entryData.didWell}</p>

      <h2 className={classes.subHeading}>What I'm doing tomorrow:</h2>
      <p className={classes.paragragh}>{entryData.tomorrowTasks}</p>
    </>
  );

  const resizeTextArea = (tx) => {
    if (tx.value === '') {
      tx.setAttribute("style", "height: 2.1rem;overflow-y:hidden;");
    } else {
      tx.setAttribute("style", `height: max(2.1rem, ${tx.scrollHeight}px);overflow-y:hidden;`);
    }
  }

  const accomplishedChangeHandler = (e) => {
    resizeTextArea(e.target);
    setEntryData((prevState) => {
      return {
        ...prevState,
        accomplished: e.target.value,
      }
    });
  }

  const didWellChangeHandler = (e) => {
    resizeTextArea(e.target);
    setEntryData((prevState) => {
      return {
        ...prevState,
        didWell: e.target.value,
      }
    });
  }

  const tomorrowTasksChangeHandler = (e) => {
    resizeTextArea(e.target);
    setEntryData((prevState) => {
      return {
        ...prevState,
        tomorrowTasks: e.target.value,
      }
    });
  }

  const deleteBtnClickHandler = (e) => {
    const btn = e.target;
    if (!deleteEntry) {
      setDeleteEntry(true);
      btn.parentElement.style = "margin-top: 0.1rem;";

      setTimeout(() => {
        setDeleteEntry(false);
        btn.parentElement.style = "";
      }, 6000);
    } else {
      props.onDelete();
    }
  }

  const editableEntry = (
    <form onSubmit={saveHandler} onReset={resetHandler}>
      <h2 className={classes.subHeading}>What I accomplished:</h2>
      <textarea id="accomplished" className={classes.input} onChange={accomplishedChangeHandler} value={entryData.accomplished || ''}></textarea>

      <h2 className={classes.subHeading}>What I did well:</h2>
      <textarea id="didWell" className={classes.input} onChange={didWellChangeHandler} value={entryData.didWell || ''}></textarea>

      <h2 className={classes.subHeading}>What I'm doing tomorrow:</h2>
      <textarea id="tomorrow" className={classes.input} onChange={tomorrowTasksChangeHandler} value={entryData.tomorrowTasks || ''}></textarea>

      <div className={classes.buttonContainer}>
        <Button type="reset" className={classes.button}>Cancel</Button>
        <Button type="submit" className={classes.button}>Save</Button>
      </div>

      {deleteEntry && <p className={classes.subText}>Click button again within 5 seconds to permanently delete entry.</p>}
      {entryData._id && <div className={classes.deleteBtnContainer}>
        <Button className={`${classes.deleteBtn} ${classes.button}`} onClick={deleteBtnClickHandler}>Delete Note</Button>
      </div>}
    </form>
  )

  useEffect(() => {
    if (!entryData._id) {
      setIsEditing(true);
    }
  }, []);

  useEffect(() => {
    if (isEditing) {
      const textAreas = document.querySelectorAll("textarea");
      textAreas.forEach(tx => {
        resizeTextArea(tx);
      });
    }
  }, [isEditing]);

  return (
    <>
      <i className={classes.close + " fa-solid fa-xmark"} onClick={closeHandler} ></i>
      {!isEditing && <i className={classes.edit + " fa-solid fa-pen"} onClick={editHandler}
        disabled={!entryData.editable} ></i>}

      <h1 className={classes.headingTagline}>Daily Log Entry</h1>
      <h2 className={classes.tagline}>{date}</h2>
      <div className={classes.line}>
        <hr />
      </div>
      {!isEditing && viewableEntry}
      {isEditing && editableEntry}
    </>
  )
}

export default DailyLogEntry;
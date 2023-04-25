import React, { useState, useEffect } from "react";
import Button from "../UI/Button/Button";
import classes from "./EntryPopupSkeleton.module.css";

const SolutionEntry = (props) => {
  const date = props.entry.date ? new Date(props.entry.date).toDateString() : new Date().toDateString();
  const [isEditing, setIsEditing] = useState(false);
  const [startingData, setStartingData] = useState({
    _id: props.entry._id,
    editable: props.entry.editable || true,
    problem: props.entry.problem,
    solution: props.entry.solution,
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
    const problem = event.target[0].value;
    const solution = event.target[1].value;

    const url = entryData._id ? `${process.env.REACT_APP_API_URL}/posts/edit/${props.entry._id}?postType=solution` : `${process.env.REACT_APP_API_URL}/posts/new?type=solution`;

    const method = entryData._id ? 'PATCH' : 'POST';

    const result = await fetch(url, {
      method: method,
      headers: {
        "Authorization": `Bearer ${props.token}`,
        "content-type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({
        problem: problem,
        solution: solution,
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
        problem: problem,
        solution: solution,
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
      <p className={classes.paragragh}>{entryData.solution}</p>
    </>
  );

  const resizeTextArea = (tx) => {
    if (tx.value === '') {
      tx.setAttribute("style", "height: 2.1rem;overflow-y:hidden;");
    } else {
      tx.setAttribute("style", `height: max(2.1rem, ${tx.scrollHeight}px);overflow-y:hidden;`);
    }
  }

  const problemChangeHandler = (e) => {
    resizeTextArea(e.target);
    setEntryData((prevState) => {
      return {
        ...prevState,
        problem: e.target.value,
      }
    });
  }

  const solutionChangeHandler = (e) => {
    resizeTextArea(e.target);
    setEntryData((prevState) => {
      return {
        ...prevState,
        solution: e.target.value,
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
      <h2 className={classes.subHeading}>Problem:</h2>
      <textarea id="problem" className={classes.input} onChange={problemChangeHandler} value={entryData.problem || ''}></textarea>

      <h2 className={classes.subHeading}>Solution:</h2>
      <textarea id="solution" className={classes.input} onChange={solutionChangeHandler} value={entryData.solution || ''}></textarea>

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

  return (
    <>
      <i className={classes.close + " fa-solid fa-xmark"} onClick={closeHandler} ></i>
      {!isEditing && <i className={classes.edit + " fa-solid fa-pen"} onClick={editHandler}
        disabled={!entryData.editable} ></i>}
      <h1 className={classes.headingTagline}>Solution: {entryData.problem}</h1>
      <h2 className={classes.tagline}>{date}</h2>
      <div className={classes.line}>
        <hr />
      </div>
      {!isEditing && viewableEntry}
      {isEditing && editableEntry}
    </>
  )
}

export default SolutionEntry;
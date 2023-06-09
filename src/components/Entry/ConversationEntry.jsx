import React, { useState, useEffect } from "react";
import Button from "../UI/Button/Button";
import classes from "./EntryPopupSkeleton.module.css";

const ConversationEntry = (props) => {
  const date = props.entry.date ? new Date(props.entry.date).toDateString() : new Date().toDateString();
  const [isEditing, setIsEditing] = useState(false);
  const [startingData, setStartingData] = useState({
    _id: props.entry._id,
    editable: props.entry.editable || true,
    colleague: props.entry.colleague,
    notes: props.entry.notes,
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
    const colleague = event.target[0].value;
    const notes = event.target[1].value;

    const url = entryData._id ? `${process.env.REACT_APP_API_URL}/posts/edit/${props.entry._id}?postType=conversation` : `${process.env.REACT_APP_API_URL}/posts/new?type=conversation`;

    const method = entryData._id ? 'PATCH' : 'POST';

    const result = await fetch(url, {
      method: method,
      headers: {
        "Authorization": `Bearer ${props.token}`,
        "content-type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({
        colleague: colleague,
        notes: notes,
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
        colleeague: colleague,
        notes: notes,
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
      <p className={classes.paragragh}>{entryData.notes}</p>
    </>
  );

  const resizeTextArea = (tx) => {
    if (tx.value === '') {
      tx.setAttribute("style", "height: 2.1rem;overflow-y:hidden;");
    } else {
      tx.setAttribute("style", `height: max(2.1rem, ${tx.scrollHeight}px);overflow-y:hidden;`);
    }
  }

  const colleagueChangeHandler = (e) => {
    resizeTextArea(e.target);
    setEntryData((prevState) => {
      return {
        ...prevState,
        colleague: e.target.value,
      }
    });
  }

  const notesChangeHandler = (e) => {
    resizeTextArea(e.target);
    setEntryData((prevState) => {
      return {
        ...prevState,
        notes: e.target.value,
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
      <h2 className={classes.subHeading}>Colleague:</h2>
      <textarea id="colleague" className={classes.input} onChange={colleagueChangeHandler} value={entryData.colleague || ''}></textarea>

      <h2 className={classes.subHeading}>Notes:</h2>
      <textarea id="notes" className={classes.input} onChange={notesChangeHandler} value={entryData.notes || ''}></textarea>

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
      <h1 className={classes.headingTagline}>Conversation with {entryData.colleague}</h1>
      <h2 className={classes.tagline}>{date}</h2>
      <div className={classes.line}>
        <hr />
      </div>
      {!isEditing && viewableEntry}
      {isEditing && editableEntry}
    </>
  )

}

export default ConversationEntry;
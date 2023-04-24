import React, { useState } from "react";
import Button from "../UI/Button/Button";
import classes from "./EntryPopupSkeleton.module.css";

const NoteEntry = (props) => {
  const date = new Date(props.entry.date).toDateString();
  const [isEditing, setIsEditing] = useState(false);
  const [startingData, setStartingData] = useState({
    title: props.entry.title || '',
    content: props.entry.content || '',
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
    const title = event.target[0].value;
    const content = event.target[1].value;

    const result = await fetch(`${process.env.REACT_APP_API_URL}/posts/edit/${props.entry._id}?postType=note`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${props.token}`,
        "content-type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    const resData = { ...await result.json(), status: result.status }

    if (resData.status !== 200) {
      props.onNotification({ title: "Error Occurred", type: "error", message: resData.message });
      return;
    }

    setIsEditing(false);
    setStartingData({
      title: title,
      content: content,
    });
    props.onNotification({ title: "Changes Saved.", type: "success", message: resData.message });
  }

  const resetHandler = () => {
    setEntryData(startingData);
    setIsEditing(false);
  }

  const viewableEntry = (
    <>
      <p className={classes.paragragh}>{entryData.content}</p>
    </>
  );

  const resizeTextArea = (tx) => {
    if (tx.value === '') {
      tx.setAttribute("style", "height: 2.1rem;overflow-y:hidden;");
    } else {
      tx.setAttribute("style", `height: max(2.1rem, ${tx.scrollHeight}px);overflow-y:hidden;`);
    }
  }

  const titleChangeHandler = (e) => {
    resizeTextArea(e.target);
    setEntryData((prevState) => {
      return {
        ...prevState,
        title: e.target.value,
      }
    });
  }

  const notesChangeHandler = (e) => {
    resizeTextArea(e.target);
    setEntryData((prevState) => {
      return {
        ...prevState,
        content: e.target.value,
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
      <h2 className={classes.subHeading}>Title:</h2>
      <textarea id="title" className={classes.input} onChange={titleChangeHandler} value={entryData.title || ''}></textarea>

      <h2 className={classes.subHeading}>Notes:</h2>
      <textarea id="notes" className={classes.input} onChange={notesChangeHandler} value={entryData.content || ''}></textarea>

      <div className={classes.buttonContainer}>
        <Button type="reset" className={classes.button}>Cancel</Button>
        <Button type="submit" className={classes.button}>Save</Button>
      </div>

      {deleteEntry && <p className={classes.subText}>Click button again within 5 seconds to permanently delete entry.</p>}
      <div className={classes.deleteBtnContainer}>
        <Button className={`${classes.deleteBtn} ${classes.button}`} onClick={deleteBtnClickHandler}>Delete Note</Button>
      </div>
    </form>
  )

  return (
    <>
      <i className={classes.close + " fa-solid fa-xmark"} onClick={closeHandler} ></i>
      {!isEditing && <i className={classes.edit + " fa-solid fa-pen"} onClick={editHandler}
        disabled={!props.entry.editable} ></i>}
      <h1 className={classes.headingTagline}>{entryData.title}</h1>
      <h2 className={classes.tagline}>{date}</h2>
      <div className={classes.line}>
        <hr />
      </div>
      {!isEditing && viewableEntry}
      {isEditing && editableEntry}
    </>
  )

}

export default NoteEntry;
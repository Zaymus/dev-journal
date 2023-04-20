import React from "react";
import classes from "./EntryPopupSkeleton.module.css";

const EntryPopupSkeleton = (props) => {
  const entry = props.entryData;
  const date = new Date(entry.date).toDateString();

  const closeHandler = () => {
    props.onRemove(null);
  }

  const dailyLog = (
    <>
      <i className={classes.close + " fa-solid fa-xmark"} onClick={closeHandler} ></i>
      <h1 className={classes.headingTagline}>Daily Log Entry</h1>
      <h2 className={classes.tagline}>{date}</h2>
      <div className={classes.line}>
        <hr />
      </div>
      <h2 className={classes.subHeading}>What I accomplished:</h2>
      <p className={classes.paragragh}>{entry.accomplished}</p>
      
      <h2 className={classes.subHeading}>What I did well:</h2>
      <p className={classes.paragragh}>{entry.didWell}</p>
      
      <h2 className={classes.subHeading}>What I'm doing tomorrow:</h2>
      <p className={classes.paragragh}>{entry.tomorrowTasks}</p>
    </>
  );

  const solution = (
    <>
      <i className={classes.close + " fa-solid fa-xmark"} onClick={closeHandler} ></i>
      <h1 className={classes.headingTagline}>Solution: {entry.problem}</h1>
      <h2 className={classes.tagline}>{date}</h2>
      <div className={classes.line}>
        <hr />
      </div>
      <p className={classes.paragragh}>{entry.solution}</p>
    </>
  );

  const conversation = (
    <>
      <i className={classes.close + " fa-solid fa-xmark"} onClick={closeHandler} ></i>
      <h1 className={classes.headingTagline}>Conversation with {entry.colleague}</h1>
      <h2 className={classes.tagline}>{date}</h2>
      <div className={classes.line}>
        <hr />
      </div>
      <p className={classes.paragragh}>{entry.notes}</p>
    </>
  );

  const note = (
    <>
      <i className={classes.close + " fa-solid fa-xmark"} onClick={closeHandler} ></i>
      <h1 className={classes.headingTagline}>{entry.title}</h1>
      <h2 className={classes.tagline}>{date}</h2>
      <div className={classes.line}>
        <hr />
      </div>
      <p className={classes.paragragh}>{entry.content}</p>
      <div className={classes.tags}>
        {entry.tags?.map(tag => {
          return <span key={tag} className={classes.tag}>{tag}</span>
        })}
      </div>
    </>
  );

  return (
    <>
      {entry.type === "daily-log" && dailyLog}
      {entry.type === "solution" && solution}
      {entry.type === "conversation" && conversation}
      {entry.type === "note" && note}
    </>
  )
}

export default EntryPopupSkeleton;
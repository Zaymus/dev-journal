import React, { useState, useEffect, useRef } from "react";
import classes from "./GoalUpdateForm.module.css";
import inputClasses from "../Entry/EntryPopupSkeleton.module.css";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

const GoalUpdateForm = (props) => {
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(props.progress);
  const inputRef = useRef();

  const resizeTextArea = (tx) => {
    if (tx.value === '') {
      tx.setAttribute("style", "height: 2.1rem;overflow-y:hidden;");
    } else {
      tx.setAttribute("style", `height: max(2.1rem, ${tx.scrollHeight}px);overflow-y:hidden;`);
    }
  }

  const descriptionChangeHandler = (e) => {
    resizeTextArea(e.target);
    setDescription(e.target.value);
  }

  const progressChangeHandler = (e) => {
    setProgress(e.target.value);
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <Card className={classes.container}>
      <form onSubmit={props.onSubmit} onReset={props.onReset}>
        <h2>{new Date().toDateString()}</h2>
        <textarea id="description" className={inputClasses.input} onChange={descriptionChangeHandler} value={description || ''} placeholder="Description of update" ref={inputRef}></textarea>
        <div className={classes.progressContainer}>
          <h3>Progress:</h3>
          <input id="progress" className={`${inputClasses.input} ${classes.progress}`} type="number" min="0" max="100" step="1" value={progress} onChange={progressChangeHandler} />
        </div>
        <div className={`${inputClasses.buttonContainer} ${classes.buttonContainer}`}>
          <Button type="reset" className={inputClasses.button}>Cancel</Button>
          <Button type="submit" className={inputClasses.button}>Save</Button>
        </div>
      </form>
    </Card>
  );
}

export default GoalUpdateForm;
import React, { useState } from "react";
import Button from "../UI/Button/Button";
import classes from "./GoalDetail.module.css";
import formClasses from "../Entry/EntryPopupSkeleton.module.css";

const GoalForm = (props) => {
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const titleChangeHandler = (e) => {
    const length = e.target.value.length;
    setIsTitleValid(length >= 4 && length <= 48);
  }

  const descriptionChangeHandler = (e) => {
    const length = e.target.value.length;
    setIsDescriptionValid(length >= 24);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const body = {
      title: e.target[0].value,
      description: e.target[2].value,
      timeline: e.target[1].value,
    }

    const url = `${process.env.REACT_APP_API_URL}/user/goals`;

    const result = await fetch(url, {
      method: props.newGoal ? 'POST' : 'PATCH',
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const resData = await result.json();

    if (result.status !== 200) {
      props.onNotification({ title: "Error Occurred", type: "error", message: resData.message });
      return;
    }

    props.onNotification({ title: "Goal Created or Updated!", type: "success", message: resData.message });
    props.setIsEditing(false);
    props.setNewGoal(false);
    props.onAddNewGoal(resData.goal);
  }

  const resetHandler = () => {
    props.setIsEditing(false);
    props.onCancelNewGoal();
  }

  return (
    <form onSubmit={submitHandler} onReset={resetHandler} className={classes.formContainer} >
      {props.newGoal && <>
        <div className={classes.title}>
          <h2>Title:</h2>
          <textarea id="title" className={`${formClasses.input} ${!isTitleValid && classes.invalid}`} value={props.goal?.title} placeholder="Title for goal" onChange={titleChangeHandler}></textarea>
        </div>
        <div className={classes.datePicker}>
          <div className={classes.timelineHeader}>
            <h2>Timeline:</h2>
            <span className={classes.subText}>When you want to have the goal completed.</span>
          </div>
          <input type="date" name="timeline" min={new Date().toISOString().split('T')[0]} value={new Date().toISOString().split('T')[0]} max={new Date(new Date().setFullYear(new Date().getFullYear() + 50)).toISOString().split("T")[0]} />
        </div>
      </>}
      <div className={classes.description}>
        <h2>Description:</h2>
        <textarea id="description" className={`${formClasses.input} ${!isDescriptionValid && classes.invalid}`} value={props.goal?.description} placeholder="Description of goal" onChange={descriptionChangeHandler}></textarea>
      </div>
      <div className={classes.buttonContainer}>
        <Button type="reset" className={classes.button}>Cancel</Button>
        <Button type="submit" className={classes.button}>Save</Button>
      </div>
    </form>
  )
}

export default GoalForm;
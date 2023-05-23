import React, { useState, useEffect } from "react";
import Button from "../UI/Button/Button";
import classes from "./GoalDetail.module.css";
import formClasses from "../Entry/EntryPopupSkeleton.module.css";

const GoalForm = (props) => {
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [goalData, setGoalData] = useState({ title: '', description: '', timeline: new Date().toISOString().split('T')[0] });
  const [startingGoalData, setStartingGoalData] = useState({ title: '', description: '', timeline: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    if (props.goal) {
      setStartingGoalData({
        title: props.goal.title,
        description: props.goal.description,
        timeline: props.goal.timeline || new Date().toISOString().split('T')[0],
      });

      setGoalData({
        title: props.goal.title,
        description: props.goal.description,
        timeline: props.goal.timeline || new Date().toISOString().split('T')[0],
      });
    }
  }, [props.goal]);

  const titleChangeHandler = (e) => {
    const length = e.target.value.length;
    setIsTitleValid(length >= 4 && length <= 48);
    setGoalData((prevState) => {
      return {
        ...prevState,
        title: e.target.value,
      }
    });
  }

  const timelineChangeHandler = (e) => {
    e.preventDefault();
    setGoalData((prevState) => {
      return {
        ...prevState,
        timeline: e.target.value,
      }
    });
  }

  const descriptionChangeHandler = (e) => {
    const length = e.target.value.length;
    setIsDescriptionValid(length >= 24);
    setGoalData((prevState) => {
      return {
        ...prevState,
        description: e.target.value,
      }
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const body = {
      title: goalData.title,
      description: goalData.description,
      timeline: goalData.timeline,
    }
    const url = `${process.env.REACT_APP_API_URL}/user/goals${props.newGoal ? '' : `/${props.goal?._id}`}`;

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

    if (props.newGoal) {
      props.onAddNewGoal(resData.goal);
      return;
    }

    props.onUpdateGoal(resData.goal);
  }

  const resetHandler = () => {
    props.setIsEditing(false);
    props.onCancelNewGoal();
    setGoalData(startingGoalData);
  }

  return (
    <form onSubmit={submitHandler} onReset={resetHandler} className={classes.formContainer} >
      {props.newGoal && <>
        <div className={classes.title}>
          <h2>Title:</h2>
          <textarea id="title" className={`${formClasses.input} ${!isTitleValid && classes.invalid}`} value={goalData.title} placeholder="Title for goal" onChange={titleChangeHandler}></textarea>
        </div>
        <div className={classes.datePicker}>
          <div className={classes.timelineHeader}>
            <h2>Timeline:</h2>
            <span className={classes.subText}>When you want to have the goal completed.</span>
          </div>
          <input type="date" name="timeline" min={new Date().toISOString().split('T')[0]} defaultValue={new Date().toISOString().split('T')[0]} max={new Date(new Date().setFullYear(new Date().getFullYear() + 50)).toISOString().split("T")[0]} onChange={timelineChangeHandler} />
        </div>
      </>}
      <div className={classes.description}>
        <h2>Description:</h2>
        <textarea id="description" className={`${formClasses.input} ${!isDescriptionValid && classes.invalid}`} value={goalData.description} placeholder="Description of goal" onChange={descriptionChangeHandler}></textarea>
      </div>
      <div className={classes.buttonContainer}>
        <Button type="reset" className={classes.button}>Cancel</Button>
        <Button type="submit" className={classes.button}>Save</Button>
      </div>
    </form>
  )
}

export default GoalForm;
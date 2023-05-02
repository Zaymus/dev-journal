import React, { useState, useEffect } from "react";
import GoalDetailHeader from "./GoalDetailHeader";
import GoalDetailUpdates from "./GoalDetailUpdates";
import Button from "../UI/Button/Button";
import classes from "./GoalDetail.module.css";
import formClasses from "../Entry/EntryPopupSkeleton.module.css";

const GoalDetail = (props) => {
  const [timeline, setTimeline] = useState('');
  const [inTimeline, setInTimeline] = useState();
  const [updates, setUpdates] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const goal = props.goal;

  useEffect(() => {
    const today = new Date();
    const timeline = new Date(goal?.timeline);
    var diff = timeline - today;

    var _day = 1000 * 60 * 60 * 24;
    var _week = 365 / 52;
    var _month = 365 / 12;
    var _year = 365;

    if (diff < 0) {
      setInTimeline(false);
      setTimeline(timeline.toDateString());
      return;
    }

    var days = Math.floor(diff / _day);
    var years = Math.floor(days / _year);
    days -= (years * _year) + 1;
    var months = Math.floor(days / _month);
    days -= Math.floor(months * _month);
    var weeks = Math.floor(days / _week);
    days -= Math.floor(weeks * _week);

    var timelineString = '';

    timelineString += years > 0 ? `${years} year${years > 1 ? 's' : ''} ${months || weeks || days ? ':' : ''} ` : '';
    timelineString += months > 0 ? `${months} month${months > 1 ? 's' : ''} ${weeks || days ? ':' : ''} ` : '';
    timelineString += weeks > 0 ? `${weeks} week${weeks > 1 ? 's' : ''} ${days ? ':' : ''} ` : '';
    timelineString += days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '';

    timelineString += `\t(${timeline.toDateString()})`

    setTimeline(timelineString);
    setInTimeline(true);
  }, [goal?.timeline]);

  useEffect(() => {
    if (Array.isArray(goal?.updates)) {
      goal.updates.sort(sortEntries);
      goal.updates.forEach((update) => {
        update.date = new Date(update.date);
      });

      setUpdates(goal.updates);
    }
  }, [goal?.updates]);

  const sortEntries = (a, b) => {
    if (new Date(a.date) > new Date(b.date)) {
      return -1;
    } else if (new Date(a.date) < new Date(b.date)) {
      return 1;
    }
    return 0;
  }

  const deleteHandler = () => {

  }

  const viewingDetail = (
    <>
      <div className={classes.description}>
        <h2>Description:</h2>
        <span>{goal?.description}</span>
      </div>
      <GoalDetailUpdates updates={updates} setUpdates={setUpdates} goal={goal} goals={props.goals} setGoals={props.setGoals} onNotification={props.onNotification} token={props.token} />
    </>
  )

  const submitHandler = (e) => { }

  const resetHandler = () => {
    setIsEditing(false);
  }

  const editingDetail = (
    <form onSubmit={submitHandler} onReset={resetHandler}>
      <div className={classes.description}>
        <h2>Description:</h2>
        <textarea id="description" className={formClasses.input} value={goal?.description} placeholder="Description of goal">{goal?.description}</textarea>
      </div>

      <div className={classes.buttonContainer}>
        <Button type="reset" className={classes.button}>Cancel</Button>
        <Button type="submit" className={classes.button}>Save</Button>
      </div>
    </form>
  )

  return (
    <div className={classes.container}>
      <GoalDetailHeader inTimeline={inTimeline} timeline={timeline} goal={goal} isEditing={isEditing} setIsEditing={setIsEditing} onDelete={deleteHandler} />
      {isEditing && editingDetail}
      {!isEditing && viewingDetail}
    </div>
  )
}

export default GoalDetail;
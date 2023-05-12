import React, { useState, useEffect } from "react";
import GoalDetailHeader from "./GoalDetailHeader";
import GoalDetailUpdates from "./GoalDetailUpdates";
import GoalForm from "./GoalForm";
import classes from "./GoalDetail.module.css";

const GoalDetail = (props) => {
  const [timeline, setTimeline] = useState('');
  const [inTimeline, setInTimeline] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    setGoal(props.goal);
  }, [props.goal]);

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
  }, [goal]);

  useEffect(() => {
    if (Array.isArray(goal?.updates)) {
      goal.updates.sort(sortEntries);
      goal.updates.forEach((update) => {
        update.date = new Date(update.date);
      });
    }
  }, [goal?.updates]);

  useEffect(() => {
    if (props.goal === null && props.newGoal) {
      setIsEditing(true);
    }
  }, [props.goal, props.newGoal]);

  const sortEntries = (a, b) => {
    if (new Date(a.date) > new Date(b.date)) {
      return -1;
    } else if (new Date(a.date) < new Date(b.date)) {
      return 1;
    }
    return 0;
  }

  const deleteHandler = (goalToRemove) => {
    var newArr = null;
    var removedGoalIdx = props.goals?.findIndex((goal) => goal === goalToRemove);
    newArr = props.goals?.filter(goal => { return goal !== goalToRemove });

    if (newArr === null) {
      return;
    }

    props.setGoals(newArr);
    if (newArr.length === 0) {
      return;
    }
    if (newArr.length - 1 > removedGoalIdx) {
      props.onSelectGoal(newArr[removedGoalIdx + 1]);
    } else if (newArr.length - 1 === removedGoalIdx) {
      props.onSelectGoal(newArr[removedGoalIdx]);
    } else {
      props.onSelectGoal(newArr[removedGoalIdx - 1]);
    }
  }

  const viewingDetail = (
    <>
      <div className={classes.description}>
        <h2>Description:</h2>
        <span>{goal?.description}</span>
      </div>
      <GoalDetailUpdates goal={goal} goals={props.goals} setGoals={props.setGoals} onNotification={props.onNotification} token={props.token} />
    </>
  )

  const editingDetail = (
    <GoalForm setIsEditing={setIsEditing} token={props.token} goal={goal} newGoal={props.newGoal} setNewGoal={props.setNewGoal} onCancelNewGoal={props.onCancelNewGoal} onAddNewGoal={props.onAddNewGoal} onNotification={props.onNotification} />
  )

  return (
    <>
      <div className={`${classes.container} ${props.goals?.length === 0 && classes.noGoals}`}>
        {(props.goals?.length === 0 && !isEditing) && <h1>No Details available</h1>}
        {(props.goals?.length > 0 && !props.newGoal) && <GoalDetailHeader inTimeline={inTimeline} timeline={timeline} goal={goal} isEditing={isEditing} setIsEditing={setIsEditing} onDelete={deleteHandler} token={props.token} onNotification={props.onNotification} />}

        {isEditing && editingDetail}

        {(!isEditing && goal !== null) && viewingDetail}
      </div>
    </>
  )
}

export default GoalDetail;
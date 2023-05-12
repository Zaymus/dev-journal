import React, { useState, useEffect } from "react";
import Card from "../UI/Card/Card";
import ProgressBar from "../UI/ProgressBar/ProgressBar";
import classes from "./GoalListItem.module.css";

const GoalListItem = (props) => {
  const [goal, setGoal] = useState({ title: '', progress: 0 });

  useEffect(() => {
    setGoal(props.goal);
  }, [props.goal])

  const clickHandler = () => {
    props.onClick(props.goal);
  }

  return (
    <Card className={`${classes.container} ${props.selected && classes.selected}`} onClick={clickHandler}>
      <h1 className={classes.title}>{goal.title}</h1>
      <ProgressBar className={classes.progress} fillPercent={goal.progress} />
    </Card>
  );
}

export default GoalListItem;
import React from "react";
import Card from "../UI/Card/Card";
import ProgressBar from "../UI/ProgressBar/ProgressBar";
import classes from "./GoalListItem.module.css";

const GoalListItem = (props) => {
  const goal = props.goal;

  const clickHandler = () => {
    props.onClick(goal);
  }

  return (
    <Card className={`${classes.container} ${props.selected && classes.selected}`} onClick={clickHandler}>
      <h1 className={classes.title}>{goal.title}</h1>
      <ProgressBar fillPercent={goal.progress} />
    </Card>
  );
}

export default GoalListItem;
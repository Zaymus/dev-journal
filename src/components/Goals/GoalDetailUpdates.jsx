import React, { useState } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import GoalUpdateForm from "./GoalUpdateForm";
import classes from './GoalDetail.module.css';

const GoalDetailUpdates = (props) => {
  const [newUpdate, setNewUpdate] = useState(false);

  const newUpdateHandler = () => {
    setNewUpdate(true);
  }

  const resetNewUpdateHandler = () => {
    setNewUpdate(false);
  }

  const createNewUpdateHandler = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/goals/update/${props.goal._id}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'Content-Type': "application/json",
        'Accept': "application/json",
      },
      body: JSON.stringify({
        progress: parseInt(e.target[1].value),
        description: e.target[0].value,
      })
    });

    const data = await res.json();

    if (res.status !== 200) {
      props.onNotification({ title: "Error Occurred", type: "error", message: data.message });
      return;
    }

    props.onNotification({ title: "Update Successfull", type: "success", message: data.message });
    setNewUpdate(false);
    const idx = props.goals?.map(goal => goal._id).indexOf(props.goal?._id);

    props.goal?.updates.unshift({ description: e.target[0].value, date: new Date(), _id: new Date().getMilliseconds() });
    props.goal.progress = parseInt(e.target[1].value);
    props.setGoals((prevState) => {
      let goalList = [...prevState];
      let newGoal = { ...goalList[idx], ...props.goal };

      goalList[idx] = newGoal;

      return [
        ...goalList,
      ]
    })
  }

  return (
    <div className={classes.updates}>
      <div className={classes.updateHeader}>
        <h2>Updates:</h2>
        {!newUpdate && <Button className={classes.updateButton} onClick={newUpdateHandler}>New Update</Button>}
      </div>
      {newUpdate && <GoalUpdateForm onSubmit={createNewUpdateHandler} onReset={resetNewUpdateHandler} progress={props.goal.progress} />}
      {props.goal?.updates.map((update) => {
        return (
          <Card className={classes.update} key={`${update._id}-${update.date}`}>
            <p>{new Date(update.date).toDateString()}</p>
            <p>{update.description}</p>
          </Card>
        )
      })}
    </div>
  )
}

export default GoalDetailUpdates;
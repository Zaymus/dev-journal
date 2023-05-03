import React, { useState, useEffect, useRef } from "react";
import Card from "../components/UI/Card/Card";
import GoalListItem from "../components/Goals/GoalListItem";
import GoalDetail from "../components/Goals/GoalDetail";
import classes from "./Goals.module.css";

const Goals = (props) => {
  const headingRef = useRef();
  const sidebarRef = useRef();

  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    const height = headingRef.current.getBoundingClientRect().height + "px";
    sidebarRef.current.style = `height: calc(100% - ${height});`;
  }, []);

  useEffect(() => {
    if (!props.token) return;
    fetch(`${process.env.REACT_APP_API_URL}/user/goals`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'Content-Type': "application/json",
        'Accept': "application/json",
      }
    })
      .then(async result => {
        return { data: await result.json(), status: result.status }
      })
      .then(resData => {
        if (resData.status === 404) return;

        if (resData.status !== 200) {
          props.onNotification({ title: "Error Occurred", type: "error", message: resData.message });
          return;
        }


        setGoals(resData.data);
        setSelectedGoal(resData.data[0]);
      })
      .catch(err => {
        console.log(err);
      })
  }, [props.token]);

  const goalClickHandler = (goal) => {
    setSelectedGoal(goal);
  }

  return (
    <div className={classes.container}>
      <Card className={classes.sidebarContainer}>
        <h1 className={classes.heading} ref={headingRef}>Goals</h1>
        <i className={`${classes.newGoal} fa-solid fa-plus`}></i>
        <div className={`${classes.sidebar} ${goals.length === 0 && classes.noGoals}`} ref={sidebarRef}>
          {goals.length === 0 && <h1>No Goals Found</h1>}
          {goals.length > 0 && goals?.map(goal => {
            return <GoalListItem goal={goal} key={goal._id} onClick={goalClickHandler} selected={goal === selectedGoal} />
          })}
        </div>
      </Card>
      <Card className={classes.contentContainer}>
        <div className={classes.content}>
          <GoalDetail goal={selectedGoal} goals={goals} setGoals={setGoals} token={props.token} onNotification={props.onNotification} />
        </div>
      </Card>
    </div>
  )
}

export default Goals;
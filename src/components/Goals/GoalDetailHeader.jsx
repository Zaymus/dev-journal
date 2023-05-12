import React, { useState } from "react";
import Popup from '../UI/Popup/Popup';
import Button from "../UI/Button/Button";
import classes from "../Goals/GoalDetail.module.css";
import iconClasses from "../Entry/EntryPopupSkeleton.module.css";

const GoalDetailHeader = (props) => {

  const [isDeleting, setIsDeleting] = useState(false);

  const editClickHandler = () => {
    props.setIsEditing(!props.isEditing);
  }

  const deleteClickHandler = () => {
    setIsDeleting(true);
  }

  const removePopupHandler = () => {
    setIsDeleting(false);
  }

  const deleteGoalHandler = async () => {
    const url = `${process.env.REACT_APP_API_URL}/user/goals/${props.goal?._id}`;
    const result = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${props.token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });
    const resData = await result.json();

    if (result.status !== 200) {
      props.onNotification({ title: "Error Occurred.", type: "error", message: resData.message });
      return;
    }

    props.onNotification({ title: "Deleted Goal!", type: "success", message: resData.message });
    setIsDeleting(false);
    props.onDelete(props.goal);
  }

  return (
    <>
      {!props.isEditing && <i className={iconClasses.edit + " fa-solid fa-pen"} onClick={editClickHandler} ></i>}
      <i className={`${iconClasses.close} ${classes.delete} fa-solid fa-trash`} onClick={deleteClickHandler} ></i>
      {isDeleting && <Popup onRemove={removePopupHandler} className={classes.popup}>
        <h2>Are you sure you want to permanantly delete this goal?</h2>
        <div className={classes.buttonContainer}>
          <Button onClick={removePopupHandler}>Cancel</Button>
          <Button className={classes.delete} onClick={deleteGoalHandler}>Delete</Button>
        </div>
      </Popup>}

      <h1 className={classes.title}>{props.goal?.title}</h1>
      <h2 className={classes.timeline}>
        {props.inTimeline && `Complete in: ${props.timeline}`}
        {!props.inTimeline && `Timeline set for: ${props.timeline}`}
      </h2>
      <div className={`line ${classes.line}`}>
        <hr />
      </div>
    </>
  )
}

export default GoalDetailHeader;
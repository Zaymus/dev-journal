import React, { useState } from "react";
import classes from "../Goals/GoalDetail.module.css";
import iconClasses from "../Entry/EntryPopupSkeleton.module.css";

const GoalDetailHeader = (props) => {

  const editClickHandler = () => {
    props.setIsEditing(!props.isEditing);
  }

  const deleteClickHandler = () => {

  }

  return (
    <>
      {!props.isEditing && <i className={iconClasses.edit + " fa-solid fa-pen"} onClick={editClickHandler} ></i>}
      <i className={`${iconClasses.close} ${classes.delete} fa-solid fa-trash`} onClick={deleteClickHandler} ></i >

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
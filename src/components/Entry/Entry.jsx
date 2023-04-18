import React, { useEffect, useRef } from "react";
import Card from "../UI/Card/Card";

import classes from "./Entry.module.css";

const Entry = (props) => {
  const logIconRef = useRef();
  const solutionIconRef = useRef();
  const conversationIconRef = useRef();
  const noteIconRef = useRef();

  const date = new Date(props.date);
  const dailyLog = (
    <Card className={classes.card}>
        <div className={classes.descriptors}>
          <p>{date.toDateString()}</p>
          <p>Daily Log</p>
        </div>
        <i className="fa-solid fa-book" ref={logIconRef} ></i>
    </Card>
  );

  const solution = (
    <Card className={classes.card}>
      <div className={classes.descriptors}>
        <p>{date.toDateString()}</p>
        <p>Solution: {props.problem}</p>
      </div>
      <i className="fa-solid fa-lightbulb" ref={solutionIconRef} ></i>
    </Card>
  );

  const conversation = (
    <Card className={classes.card}>
      <div className={classes.descriptors}>
        <p>{date.toDateString()}</p>
        <p>Conversation with {props.colleague}</p>
      </div>
      <i className="fa-solid fa-comments" ref={conversationIconRef} ></i>
    </Card>
  );

  const note = (
    <Card className={classes.card}>
      <div className={classes.descriptors}>
        <p>{date.toDateString()}</p>
        <p>Note: {props.title}</p>
      </div>
      <i className="fa-solid fa-note-sticky" ref={noteIconRef} ></i>
    </Card>
  );

  const positionIcons = (iconRef) => {
    const parentWidth = iconRef.current.parentElement.getBoundingClientRect().width;
    const iconWidth = iconRef.current.getBoundingClientRect().width;
    iconRef.current.style.left = (parentWidth - iconWidth) / 2 + "px";
  }

  useEffect(() => {
    if (props.type === "daily-log") {
      positionIcons(logIconRef);
    } else if (props.type === "solution"){
      positionIcons(solutionIconRef);
    } else if (props.type === "conversation") {
      positionIcons(conversationIconRef);
    } else if (props.type === "note") {
      positionIcons(noteIconRef);
    }
  }, []);

  return (
    <>
      {props.type === "daily-log" && dailyLog}
      {props.type === "solution" && solution}
      {props.type === "conversation" && conversation}
      {props.type === "note" && note}
    </>
  );
}

export default Entry
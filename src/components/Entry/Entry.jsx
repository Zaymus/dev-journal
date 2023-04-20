import React, { useEffect, useRef } from "react";
import Card from "../UI/Card/Card";

import classes from "./Entry.module.css";

const Entry = (props) => {
  const logIconRef = useRef();
  const solutionIconRef = useRef();
  const conversationIconRef = useRef();
  const noteIconRef = useRef();

  const date = new Date(props.data.date);
  const dailyLog = (
    <>
      <div className={classes.descriptors}>
        <p>{date.toDateString()}</p>
        <p>Daily Log</p>
      </div>
      <i className="fa-solid fa-book" ref={logIconRef} ></i>
    </>
  );

  const solution = (
    <>
      <div className={classes.descriptors}>
        <p>{date.toDateString()}</p>
        <p>Solution: {props.data.problem}</p>
      </div>
      <i className="fa-solid fa-lightbulb" ref={solutionIconRef} ></i>
    </>
  );

  const conversation = (
    <>
      <div className={classes.descriptors}>
        <p>{date.toDateString()}</p>
        <p>Conversation with {props.data.colleague}</p>
      </div>
      <i className="fa-solid fa-comments" ref={conversationIconRef} ></i>
    </>
  );

  const note = (
    <>
      <div className={classes.descriptors}>
        <p>{date.toDateString()}</p>
        <p>Note: {props.data.title}</p>
      </div>
      <i className="fa-solid fa-note-sticky" ref={noteIconRef} ></i>
    </>
  );

  const updateIcons = () => {
    if (props.data.type === "daily-log") {
      positionIcons(logIconRef);
    } else if (props.data.type === "solution"){
      positionIcons(solutionIconRef);
    } else if (props.data.type === "conversation") {
      positionIcons(conversationIconRef);
    } else if (props.data.type === "note") {
      positionIcons(noteIconRef);
    }
  }

  const positionIcons = (iconRef) => {
    const parentWidth = iconRef.current?.parentElement.getBoundingClientRect().width;
    const iconWidth = iconRef.current?.getBoundingClientRect().width;
    iconRef.current.style.left = (parentWidth - iconWidth) / 2 + "px";
  }

  useEffect(() => {
    window.addEventListener("resize", updateIcons);
    updateIcons();
  }, []);

  const clickHandler = () => {
    props.onSelectedEntry(props.data);
  }

  return (
    <Card className={classes.card} onClick={clickHandler} id="card">
      {props.data.type === "daily-log" && dailyLog}
      {props.data.type === "solution" && solution}
      {props.data.type === "conversation" && conversation}
      {props.data.type === "note" && note}
    </Card>
  );
}

export default Entry
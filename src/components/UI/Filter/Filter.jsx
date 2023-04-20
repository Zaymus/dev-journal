import React, { useRef, useEffect } from "react";
import classes from './Filter.module.css';

const Filter = (props) => {

  const filter_selected = useRef();
  const filter_all = useRef();
  const filter_daily = useRef();
  const filter_solution = useRef();
  const filter_conversation = useRef();
  const filter_note = useRef();

  const updateSelectedColor = () => {
    filter_all.current.style.color = props.entryFilter === "all" ? "#fff" : "#000";
    filter_daily.current.style.color = props.entryFilter === "daily-log" ? "#fff" : "#000";
    filter_solution.current.style.color = props.entryFilter === "solution" ? "#fff" : "#000";
    filter_conversation.current.style.color = props.entryFilter === "conversation" ? "#fff" : "#000";
    filter_note.current.style.color = props.entryFilter === "note" ? "#fff" : "#000";
  }

  const updateSelected = () => {
    var ref = null;
    if (props.entryFilter === "all") {
      ref = filter_all.current;
    }
    if (props.entryFilter === "daily-log") {
      ref = filter_daily.current;
    }
    if (props.entryFilter === "solution") {
      ref = filter_solution.current;
    }
    if (props.entryFilter === "conversation") {
      ref = filter_conversation.current;
    }
    if (props.entryFilter === "note") {
      ref = filter_note.current;
    }
    if (!ref) {
      return;
    }
    const rect = ref.getBoundingClientRect();
    const parentRect = ref.parentElement.getBoundingClientRect();
    filter_selected.current.style.width = rect.width + 12 + "px";
    filter_selected.current.style.left = (rect.left - parentRect.left) - 7 + "px";
    updateSelectedColor();
  }

  useEffect(() => {
    window.addEventListener("resize", updateSelected, false);
    updateSelected();
  }, []);

  useEffect(() => {
    updateSelected();
  }, [props.entryFilter]);

  const clickHandler = (event) => {
    const target = event.target;
    const value = target.getAttribute("data-value");
    props.setEntryFilter(value);
  }

  return (
    <>
      <div className={classes.filter}>
      <div className={classes.selected} ref={filter_selected} ></div>
        <span
          className={classes.option}
          data-value="all"
          ref={filter_all}
          onClick={clickHandler}
        >All</span>
        <span
          className={classes.option}
          data-value="daily-log"
          ref={filter_daily}
          onClick={clickHandler}
        >Daily Logs</span>
        <span
          className={classes.option}
          data-value="solution"
          ref={filter_solution}
          onClick={clickHandler}
        >Solutions</span>
        <span
          className={classes.option}
          data-value="conversation"
          ref={filter_conversation}
          onClick={clickHandler}
        >Conversations</span>
        <span
          className={classes.option}
          data-value="note"
          ref={filter_note}
          onClick={clickHandler}
        >Notes</span>
      </div>
    </>
  )
}

export default Filter;
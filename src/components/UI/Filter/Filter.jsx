import React, { useRef, useEffect } from "react";
import classes from './Filter.module.css';

const Filter = (props) => {

  const filter_selected = useRef();
  const filter_all = useRef();
  const filter_daily = useRef();
  const filter_solution = useRef();
  const filter_conversation = useRef();
  const filter_note = useRef();

  const updateSelected = () => {
    var rect = null;
    if (props.entryFilter === "all") {
      rect = filter_all.current?.getBoundingClientRect();
    }
    if (props.entryFilter === "daily-log") {
      rect = filter_daily.current?.getBoundingClientRect();
    }
    if (props.entryFilter === "solution") {
      rect = filter_solution.current?.getBoundingClientRect();
    }
    if (props.entryFilter === "conversation") {
      rect = filter_conversation.current?.getBoundingClientRect();
    }
    if (props.entryFilter === "notes") {
      rect = filter_note.current?.getBoundingClientRect();
    }
    if (!rect) {
      return;
    }
    const offset = rect.left;
    filter_selected.current.style.width = rect.width + 12 + "px";
    filter_selected.current.style.top = rect.top + 4.5 + window.scrollY + "px";
    filter_selected.current.style.left = offset - 6 + "px";
  }

  useEffect(() => {
    window.addEventListener("resize", updateSelected, false);
    updateSelected();
  }, []);

  useEffect(() => {
    updateSelected(props.entryFilter)
  }, [props.entryFilter, filter_all.current?.getBoundingClientRect()]);

  const clickHandler = (event) => {
    const target = event.target;
    const value = target.getAttribute("data-value");
    props.setEntryFilter(value);
  }

  return (
    <>
      <div className={classes.selected} ref={filter_selected} ></div>
      <div className={classes.filter}>
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
          data-value="notes"
          ref={filter_note}
          onClick={clickHandler}
        >Notes</span>
      </div>
    </>
  )
}

export default Filter;
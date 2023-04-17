import React, { useState, useRef, useEffect } from "react";
import classes from './Filter.module.css';

const Filter = () => {
  const [filter, setFilter] = useState("all");

  const filter_selected = useRef();
  const filter_all = useRef();
  const filter_daily = useRef();
  const filter_solution = useRef();
  const filter_note = useRef();

  useEffect(() => {
    var rect = null
    if (filter === "all") {
      rect = filter_all.current.getBoundingClientRect();
    }
    if (filter === "daily") {
      rect = filter_daily.current.getBoundingClientRect();
    }
    if (filter === "solution") {
      rect = filter_solution.current.getBoundingClientRect();
    }
    if (filter === "note") {
      rect = filter_note.current.getBoundingClientRect();
    }
    if (!rect) {
      return;
    }
    const offset = rect.left;
    filter_selected.current.style.width = rect.width + 5 + "px";
    filter_selected.current.style.top = rect.top + 3.5 + "px";
    filter_selected.current.style.left = offset - 2.5 + "px";
  }, [filter]);


  const clickHandler = (event) => {
    const target = event.target;
    const value = target.getAttribute("data-value");
    setFilter(value);
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
          data-value="daily"
          ref={filter_daily}
          onClick={clickHandler}
        >Daily Journal</span>
        <span
          className={classes.option}
          data-value="solution"
          ref={filter_solution}
          onClick={clickHandler}
        >Solutions</span>
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
import React, { useRef, useEffect } from "react";
import classes from './Filter.module.css';

const Filter = (props) => {

  const filter_selected = useRef();
  const filter_all = useRef();
  const filter_daily = useRef();
  const filter_solution = useRef();
  const filter_note = useRef();

  const updateSelected = () => {
    var rect = null;
    if (props.entryFilter === "all") {
      rect = filter_all.current?.getBoundingClientRect();
    }
    if (props.entryFilter === "daily") {
      rect = filter_daily.current?.getBoundingClientRect();
    }
    if (props.entryFilter === "solution") {
      rect = filter_solution.current?.getBoundingClientRect();
    }
    if (props.entryFilter === "note") {
      rect = filter_note.current?.getBoundingClientRect();
    }
    if (!rect) {
      return;
    }
    const offset = rect.left;
    filter_selected.current.style.width = rect.width + 12 + "px";
    filter_selected.current.style.top = rect.top + 4 + "px";
    filter_selected.current.style.left = offset - 6 + "px";
  }

  useEffect(() => {
    window.addEventListener("resize", updateSelected, false);
  }, []);

  useEffect(() => {
    updateSelected(props.entryFilter)
  }, [props.entryFilter]);

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
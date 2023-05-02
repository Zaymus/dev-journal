import React, { useEffect, useRef } from "react";
import classes from "./ProgressBar.module.css";

const ProgressBar = (props) => {
  const barRef = useRef();
  var fillPercent = props.fillPercent || 0;
  useEffect(() => {
    fillPercent = props.fillPercent;
    if (fillPercent <= 1) {
      fillPercent *= 100;
    }
    if (fillPercent > 100) {
      fillPercent = 100;
    }

    barRef.current.style = `width: ${fillPercent}%`;
  }, [props.fillPercent])

  return (
    <div className={classes.container}>
      <div className={classes.barContainer}>
        <div className={classes.bar} ref={barRef}></div>
      </div>
      <span className={classes.percent}>{fillPercent || 0}%</span>
    </div>
  )
}

export default ProgressBar;
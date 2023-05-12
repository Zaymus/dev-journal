import React, { useEffect, useState, useRef } from "react";
import classes from "./ProgressBar.module.css";

const ProgressBar = (props) => {
  const barRef = useRef();
  const [fillPercent, setFillPercent] = useState(0);

  useEffect(() => {
    var fillPercent = props.fillPercent;
    if (fillPercent <= 1) {
      fillPercent *= 100;
    }
    if (props.fillPercent > 100) {
      fillPercent = 100;
    }

    setFillPercent(fillPercent);
  }, [props.fillPercent]);

  useEffect(() => {
    barRef.current.style = `width: ${fillPercent}%`;
  }, [fillPercent])

  return (
    <div className={`${classes.container} ${props.className}`}>
      <div className={classes.barContainer}>
        <div className={classes.bar} ref={barRef}></div>
      </div>
      <span className={classes.percent}>{fillPercent}%</span>
    </div>
  )
}

export default ProgressBar;
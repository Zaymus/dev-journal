import React, { useRef, useEffect } from "react";
import classes from "./DropDownModal.module.css";
import navClasses from "../../NavBar/NavBar.module.css";

const DropDownModal = (props) => {
  const optionsRef = useRef();
  const dropDownRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    const height = titleRef.current.getBoundingClientRect().height + "px";
    dropDownRef.current.style = `top: calc((7vh - ${height}) / 2);`;
  }, []);

  const expandDropDown = () => {
    const height = optionsRef.current.scrollHeight + "px";
    optionsRef.current.style = `max-height: calc(${height} + 0.25rem);padding-bottom: 0.25rem;`;
  }

  const collapseDropDown = () => {
    optionsRef.current.style = null;
  }

  return (
    <div className={classes.container} onMouseLeave={collapseDropDown} ref={dropDownRef}>
      <span className={`${navClasses.link} ${classes.title}`} onMouseEnter={expandDropDown} ref={titleRef} >{props.title}</span>
      <div className={classes.options} ref={optionsRef} >
        {props.children}
      </div>
    </div>
  )
}

export default DropDownModal;
import React, { useRef, useEffect } from "react";
import classes from "./DropDownModal.module.css";
import navClasses from "../../NavBar/NavBar.module.css";

const DropDownModal = (props) => {
  const optionsRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    const titleWidth = titleRef.current.getBoundingClientRect().width + "px";
    const optionsWidth = optionsRef.current.getBoundingClientRect().width + "px";
    optionsRef.current.style = `width: max(${optionsWidth}, calc(${titleWidth} + 1rem));`;
  }, []);

  const expandDropDown = () => {
    const height = optionsRef.current.scrollHeight + "px";
    const titleWidth = titleRef.current.getBoundingClientRect().width + "px";
    titleRef.current.style = "opacity: 1;";
    const optionsWidth = optionsRef.current.getBoundingClientRect().width + "px";
    optionsRef.current.style = `width: max(${optionsWidth}, calc(${titleWidth} + 1rem));max-height: calc(${height} + 0.5rem);padding: 0.25rem;`;
  }

  const collapseDropDown = () => {
    const titleWidth = titleRef.current.getBoundingClientRect().width + "px";
    titleRef.current.style = null;
    const optionsWidth = optionsRef.current.getBoundingClientRect().width + "px";
    optionsRef.current.style = `width: max(${optionsWidth}, calc(${titleWidth} + 1rem));transition-delay: 125ms;`;
  }

  return (
    <div className={classes.container} onMouseLeave={collapseDropDown}>
      <span className={`${navClasses.link} ${classes.title}`} onMouseEnter={expandDropDown} ref={titleRef} >{props.title}</span>
      <div className={classes.options} ref={optionsRef} >
        {props.children}
      </div>
    </div>
  )
}

export default DropDownModal;
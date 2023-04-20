import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import classes from "./Popup.module.css";
import Card from "../Card/Card";

const PopupComponent = (props) => {

  const popupRef = useRef();
  const closePopupHandler = () => {
    props.onRemove(null);
  }

  return (
    <div 
      className={classes.popupBg} 
      onClick={closePopupHandler} 
      onKeyDown={props.keyDownHandler}
      ref={popupRef}
    >

    </div>
  )
}

const Popup = (props) => {

  const keyDownHandler = (event) => {
    console.log(event);
  }

  return (
    <>
      {ReactDOM.createPortal(
        <PopupComponent onRemove={props.onRemove} onKeyDown={keyDownHandler} tabIndex="0">{props.children}</PopupComponent>,
        document.querySelector("#popup-bg-root")
      )}
      {ReactDOM.createPortal(
        <Card className={classes.popup}><div className={classes.wrapper}>{props.children}</div></Card>,
        document.querySelector("#popup-root")
      )}
    </>
  )
}

export default Popup;
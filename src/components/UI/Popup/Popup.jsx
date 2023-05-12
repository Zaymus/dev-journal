import React, { useRef } from "react";
import ReactDOM from 'react-dom';
import classes from "./Popup.module.css";
import Card from "../Card/Card";

const PopupComponent = (props) => {

  const popupRef = useRef();
  const closePopupHandler = (e) => {
    e.target.className === classes.popupBg && props.onRemove(null);
  }

  return (
    <div
      className={classes.popupBg}
      onClick={closePopupHandler.bind(this)}
      onKeyDown={props.keyDownHandler}
      ref={popupRef}
    >
      {props.children}
    </div>
  )
}

const Popup = (props) => {

  const keyDownHandler = (event) => {
    console.log(event);
  }

  return (
    <>
      {/* {ReactDOM.createPortal(
        <PopupComponent onRemove={props.onRemove} onKeyDown={keyDownHandler} tabIndex="0">{props.children}</PopupComponent>,
        document.querySelector("#popup-bg-root")
      )} */}
      {ReactDOM.createPortal(
        <PopupComponent onRemove={props.onRemove} onKeyDown={keyDownHandler} tabIndex="0">
          <Card className={`${classes.popup} ${props.className}`}>
            <div className={classes.wrapper}>
              {props.children}
            </div>
          </Card>
        </PopupComponent>,
        document.querySelector("#popup-root")
      )}
    </>
  )
}

export default Popup;
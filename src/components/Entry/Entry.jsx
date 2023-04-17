import React from "react";
import Card from "../UI/Card/Card";


import classes from "./Entry.module.css";

const Entry = (props) => {
  return (
    <Card>
      <h1 className={classes.title}>{props.title}</h1>
      <p className={classes.date}>{props.date}</p>
      <p className={classes.type}>{props.type}</p>
    </Card>
  );
}

export default Entry
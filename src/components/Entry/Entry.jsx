import React from "react";
import Card from "../UI/Card/Card";


import classes from "./Entry.module.css";

const Entry = (props) => {
  return (
    <Card className={classes.card}>
      <p className={classes.date}>{props.date}</p>
      <p className={classes.type}>{props.type}</p>
    </Card>
  );
}

export default Entry
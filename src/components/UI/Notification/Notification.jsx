import React, { Component } from 'react';
import Card from '../Card/Card';
import classes from './Notification.module.css';


class Notification extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.removeNotification(this.props.notiId);
    }, 5000);
  }

  render() {
    return (
      <Card id={this.props.notiId} className={`${classes.container} ${classes[this.props.type]}`}>
        <div className={classes.wrapper}>
          {this.props.children}
        </div>
        <span className={classes.duration}></span>
      </Card>
    );
  }
}

export default Notification;
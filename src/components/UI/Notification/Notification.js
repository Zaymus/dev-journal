import React, { Component } from 'react';
import classes from './Notification.module.css';


class Notification extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.removeNotification(this.props.notiId);
    }, 5000);
  }

  render() {
    return (
      <div id={this.props.notiId} className={classes.container + ' ' + this.props.type}>
        <div className={classes.wrapper}>
          {this.props.children}
        </div>
        <span className={classes.duration}></span>
      </div>
    );
  }
}

export default Notification;
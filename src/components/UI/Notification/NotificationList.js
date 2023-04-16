import React, { Component } from 'react';
import Notification from './Notification';
import classes from './NotificationList.module.css';

class NotificationList extends Component {
  state = {
    notifications: [],
    prevNotification: null,
  }

  generateId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const len = chars.length;
    let result = '';

    for(let i = 0; i < 10; i++) {
      result += chars.charAt((Math.random() * len));
    }

    return result;
  }

  addNotification = (notification) => {
    this.setState({
      notifications: [...this.state.notifications, {...notification, id: this.generateId()}]
    });
  }

  removeNotification = (id) => {
    var array = [...this.state.notifications];
    var index = this.state.notifications.findIndex((notification) => {
      return notification.id === id;
    });

    if(index !== -1) {
      array.splice(index, 1);
      this.setState({notifications: array});
    }
  }

  componentDidUpdate() {
    if (this.props.notification) {
      const isPrevNotification = this.props.notification === this.state.prevNotification;
      if(!isPrevNotification) {
        this.addNotification({
          ...this.props.notification,
            type: this.props.notification.type ? this.props.notification.type : 'announcement'
        });

        this.setState({prevNotification: this.props.notification});
        this.props.removeNotification();
      }
    }
  }

  render() {
    return (
      <div className={classes.container}>
        {this.state.notifications.map((notification) => {
          return (
            <Notification 
              type={notification.type}
              key={notification.id}
              notiId={notification.id}
              removeNotification={this.removeNotification}
            >
              <h3 className={classes.title}>{notification.title}</h3>
              <span className={classes.message}>{notification.message}</span>
            </Notification>
          )
        })}
      </div>
    )
  }
}

export default NotificationList;
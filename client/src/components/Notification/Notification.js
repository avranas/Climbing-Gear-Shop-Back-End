import React from "react";
import { useDispatch } from "react-redux";
import "./Notification.css";
import checkmark from "../../images/checkmark.png"

const Notification = (props) => {
  const dispatch = useDispatch();

  const clearNotification = () => {
    dispatch({
      type: "notifications/endNotification",
      payload: { id: props.id },
    });
  };

  return (
    <div className="notification-container">
      <div onClick={clearNotification} className="notification-content">
        <img src={checkmark} alt="checkmark" className="notification-icon"></img>
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default Notification;

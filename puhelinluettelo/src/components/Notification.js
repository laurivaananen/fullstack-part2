import React from 'react';

const Notification = ({notification, style}) => {
  return (
    <div className={style} >
      <p>{notification}</p>
    </div>
  )
}

export default Notification;
import React from 'react';
// import './DateTimePopup.css'; // Update to the correct CSS file

const DateTimePopup = ({ dateTime, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Date/Time</h2>
        <p>{new Date(dateTime).toLocaleString()}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DateTimePopup;

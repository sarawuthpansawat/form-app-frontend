import React from 'react';
// import './DateTimePopup.css'; // Update to the correct CSS file

const DateTimePopup = ({ dateTime, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Date/Time</h2>
        <p>{new Date(formatDateTimeForInput(dateTime)).toLocaleString()}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
const formatDateTimeForInput = (dateTime) => {
  if (!dateTime) return '';
  const date = new Date(dateTime);
  return date.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'
};
export default DateTimePopup;

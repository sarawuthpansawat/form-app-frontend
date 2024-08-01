import React from 'react';
import './DraggableItem.css';

const DraggableItem = ({ type, text, onDragStart }) => {
    return (
        <div
            className="draggable-item"
            draggable
            onDragStart={(e) => onDragStart(e, type, text)}
        >
            {text}
        </div>
    );
};

export default DraggableItem;

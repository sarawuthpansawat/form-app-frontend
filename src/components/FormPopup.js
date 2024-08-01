import React, { useState } from 'react';
import axios from 'axios';
import DraggableItem from './DraggableItem';
import './FormPopup.css';

const FormPopup = ({ form, onClose, onSave }) => {
    const [name, setName] = useState(form ? form.name : '');
    const [text, setText] = useState(form ? form.text : '');
    //const [dateTime, setDateTime] = useState(form ? form.dateTime : '');
    const [dateTime, setDateTime] = useState(form ? formatDateTimeForInput(form.dateTime) : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { name, text, dateTime };
        if (form) {
            await axios.put(`http://localhost:5000/api/forms/${form._id}`, formData);
        } else {
            await axios.post('http://localhost:5000/api/forms', formData);
        }
        onSave();
        onClose();
    };

    const handleDragStart = (e, type, value) => {
        e.dataTransfer.setData('type', type);
        e.dataTransfer.setData('value', value);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('type');
        const value = e.dataTransfer.getData('value');
        
        if (type === 'text') {
            setText(value);
        } else if (type === 'dateTime') {
            setDateTime(value);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className="popup">
            <div className="left-panel">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <DraggableItem type="text" text="Default Text" onDragStart={handleDragStart} />
                                <DraggableItem type="dateTime" text="2024-08-01T12:00" onDragStart={handleDragStart} />
                            </td>
                            <td>
                                <div className="form-container" onDrop={handleDrop} onDragOver={handleDragOver}>
                                    <form onSubmit={handleSubmit}>
                                   
                                        <tr>
                                            <td>
                                            <label>
                                                Name:
                                            </label>
                                            </td>
                                            <td>
                                                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                                            </td>
                                        </tr>
                                       
                                            <label>
                                                Text:
                                            </label>
                                            
                                                <textarea value={text} onChange={e => setText(e.target.value)} />
                                            
                                        <tr>
                                            <td>
                                            <label>
                                            Date/Time:
                                            </label>
                                            </td>
                                            <td>
                                                <input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} />
                                            </td>
                                        </tr>
                                      
                                           
                                            <div className="button-group">
                                                <button type="submit">Save</button>
                                                <button type="button" onClick={onClose}>Close</button>
                                            </div>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};
const formatDateTimeForInput = (dateTime) => {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    return date.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'
};

export default FormPopup;

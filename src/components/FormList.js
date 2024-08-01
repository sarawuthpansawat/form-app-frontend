import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormPopup from './FormPopup';
import DateTimePopup from './DateTimePopup';
import '../App.css';
import './FormList.css';
import './DateTimePopup.css';

const FormList = () => {
    const [forms, setForms] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showDateTimePopup, setShowDateTimePopup] = useState(false);
    const [currentForm, setCurrentForm] = useState(null);

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        //const response = await axios.get('http://localhost:5000/api/forms');
        const response = await axios.get('https://form-app-backend.onrender.com/api/forms');
        setForms(response.data);
    };

    const handleAdd = () => {
        setCurrentForm(null);
        setShowPopup(true);
    };

    const handleEdit = (form) => {
        setCurrentForm(form);
        setShowPopup(true);
    };

    const handleDelete = async (id) => {
        //await axios.delete(`http://localhost:5000/api/forms/${id}`);
        await axios.delete(`https://form-app-backend.onrender.com/api/forms/${id}`);
        fetchForms();
    };

    const handleView = (form) => {
        setCurrentForm(form);
        setShowDateTimePopup(true);
    };

    return (
        <div className="form-list-container">
            <h1>Forms</h1>
            <div className="form-list-buttons">
                <button onClick={handleAdd}>Add</button>
            </div>
            {forms.length > 0 ? (
                <table className="form-list-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forms.map(form => (
                            <tr key={form._id}>
                                <td>{form.name}</td>
                                <td>
                                    <button className="view-button" onClick={() => handleView(form)}>View</button>
                                    <button className="edit-button" onClick={() => handleEdit(form)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(form._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No forms available.</p>
            )}
            {showPopup && (
                <FormPopup
                    form={currentForm}
                    onClose={() => setShowPopup(false)}
                    onSave={fetchForms}
                />
            )}
            {showDateTimePopup && (
                <DateTimePopup
                    dateTime={currentForm.dateTime}
                    onClose={() => setShowDateTimePopup(false)}
                />
            )}
        </div>
    );
};

export default FormList;

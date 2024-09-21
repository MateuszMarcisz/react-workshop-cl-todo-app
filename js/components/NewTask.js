import React, { useState } from 'react';
import { API_KEY, API_URL } from "../api/constants"; // Import your constants

const NewTask = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const newTask = {
            title,
            description,
            status: "open",
        };

        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': API_KEY,
                },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                const data = await response.json();
                addTask(data.data);
                setTitle('');
                setDescription('');
            } else {
                console.error("Failed to add task:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="card shadow">
            <div className="card-body">
                <h1 className="card-title">New Task</h1>
                <form onSubmit={handleSubmitForm}>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               value={title}
                               name="title"
                               placeholder="Title"
                               onChange={handleTitle}
                        />
                    </div>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               value={description}
                               name="description"
                               placeholder="Description"
                               onChange={handleDescription}
                        />
                    </div>
                    <button className="btn btn-info">
                        Add task
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewTask;

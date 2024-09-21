import React, {useState} from 'react';
import {API_KEY, API_URL} from "../api/constants";
import {deleteOperation} from "../api/deleteOperation";


const Operation = ({description, onRemoveOperation, onUpdateTime, status, timeSpent, id}) => {
    const [addTime, setAddTime] = useState(false);
    const [newTime, setNewTime] = useState(0);

    const handleAddTimeClick = () => {
        setAddTime(true);
    };

    const handleDeclineTime = () => {
        setAddTime(false);
    };

    const handleTimeUpdate = (e) => {
        setNewTime(parseInt(e.target.value));
    };

    const handleDelete = () => {
        deleteOperation(id, onRemoveOperation);
    };

    const handleTimeSubmission = async (e) => {
        e.preventDefault();

        const updatedOperation = {
            description,
            timeSpent: timeSpent + newTime
        };
        try {
            const response = await fetch(`${API_URL}/operations/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': API_KEY,
                },
                body: JSON.stringify(updatedOperation),
            });

            if (response.ok) {
                setAddTime(false);
                onUpdateTime(id, newTime);
                setNewTime(0);
            } else {
                console.error("Failed to update time", response.statusText);
            }
        } catch (error) {
            console.error("Error updating time:", error);
        }

    }

    return (
        <li
            className="list-group-item d-flex justify-content-between align-items-center"
        >
            <div>
                {description}
                {timeSpent > 0 &&
                    <span className="badge badge-success badge-pill ml-2">
                                {Math.floor(timeSpent / 60)}h {timeSpent % 60}m
                    </span>
                }
            </div>

            <div>
                {addTime &&
                    <form
                        onSubmit={handleTimeSubmission}
                    >
                        <div className="input-group input-group-sm">
                            <input type="number"
                                   className="form-control"
                                   placeholder="Spent time in minutes"
                                   style={{width: '12rem'}}
                                   value={newTime}
                                   onChange={handleTimeUpdate}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-success"
                                >
                                    <i className="fas fa-save"/>
                                </button>
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={handleDeclineTime}
                                >
                                    <i className="fas fa-times false"/>
                                </button>
                            </div>
                        </div>
                    </form>}

                <>
                    {status === 'open' &&
                        !addTime &&

                        <button
                            className="btn btn-outline-success btn-sm mr-2"
                            onClick={handleAddTimeClick}
                        >
                            Add time
                            <i className="fas fa-clock ml-1"></i>
                        </button>
                    }
                    {!addTime &&
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleDelete}
                        >
                            <i className="fas fa-trash"></i>
                        </button>}


                </>
            </div>

        </li>
    );
};

export default Operation;
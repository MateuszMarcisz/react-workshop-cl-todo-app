import React, {useState} from 'react';
import {API_KEY, API_URL} from "../api/constants";
import {getOperations} from "../api/getOperations";
import Operation from "./Operation";
import operation from "./Operation";

const Operations = ({operations, setOperations, taskId, status, form, setForm}) => {
    const [description, setDescription] = useState('');


    const handleDeleteOperation = () => {
        //     delete logic
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleUpdateTime = (id, newTime) => {
        const updatedOperations = operations.map((operation) => {
            if (operation.id === id) {
                return {...operation, timeSpent: operation.timeSpent + newTime};
            }
            return operation;
        });
        setOperations(updatedOperations);
    };


    const handleOperationSubmission = async (e) => {
        e.preventDefault();

        const newOperation = {
            description,
            timeSpent: 0
        };
        try {
            const response = await fetch(`${API_URL}/tasks/${taskId}/operations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': API_KEY,
                },
                body: JSON.stringify(newOperation),
            });

            if (response.ok) {
                const data = await response.json();
                setOperations(data.data);
                setDescription('');
                setForm(false);

                getOperations(taskId, (operationsData) => {
                    setOperations(operationsData);
                });

            } else {
                console.error("Failed to add operation", response.statusText);
            }
        } catch (error) {
            console.error("Error adding operation:", error);
        }
    }

    return (
        <div className="card-body">
            {form &&
                <form
                    onSubmit={handleOperationSubmission}
                >
                    <div className="input-group">
                        <input type="text"
                               className="form-control"
                               placeholder="Operation description"
                               value={description}
                               onChange={handleDescription}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-info">
                                Add
                                <i className="fas fa-plus-circle ml-1"></i>
                            </button>
                        </div>
                    </div>
                </form>}

            {operations.length > 0 ? (
                <ul className="list-group list-group-flush">
                    {operations.map((operation) => (
                        <Operation
                            key={operation.id}
                            id={operation.id}
                            description={operation.description}
                            onRemoveOperation={handleDeleteOperation}
                            onUpdateTime={handleUpdateTime}
                            timeSpent={operation.timeSpent}
                            status={status}
                        />
                    ))}
                </ul>
            ) : (
                <p>This task has no operations yet.</p>
            )}
        </div>
    );
};

export default Operations;
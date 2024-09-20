import React, {useEffect, useState} from "react";
import {getOperations} from "../api/getOperations";
import Operations from "./Operations";
import {API_KEY, API_URL} from "../api/constants";
import {finishTask} from "../api/finishTask";
import {deleteTask} from "../api/deleteTask";

const Task = ({task, onFinish, onDelete}) => {
    const [operations, setOperations] = useState([]);
    const [form, setForm] = useState(false);


    useEffect(() => {
        getOperations(task.id, (fetchedOperations) => {
            setOperations(fetchedOperations);
        });
    }, [task.id]);

    const handleClickAddOperation = () => {
        setForm(true);
    };

    const handleFinish = () => {
        finishTask(task.id, {
                title: task.title,
                description: task.description,
                status: 'closed'
            },
            () => {
                onFinish(task);
            });
    };


    const handleDelete = () => {
        deleteTask(task.id, onDelete);
    };

    return (
        <section
            className="card mt-5 shadow-sm"
        >
            <div
                className="card-header d-flex justify-content-between align-items-center"
            >
                <div>
                    <h5>{task.title}</h5>
                    <h6
                        className="card-subtitle text-muted"
                    >
                        {task.description}
                    </h6>
                </div>
                <div>
                    {task.status === "open" && (
                        <>
                            <button
                                className="btn btn-info btn-sm mr-2"
                                onClick={handleClickAddOperation}
                            >
                                Add operation
                                <i className="fas fa-plus-circle ml-1"/>
                            </button>
                            <button
                                className="btn btn-dark btn-sm"
                                onClick={handleFinish}
                            >
                                Finish
                                <i className="fas fa-archive ml-1"/>
                            </button>
                        </>
                    )}
                    {operations.length === 0 && (
                        <button
                            className="btn btn-outline-danger btn-sm ml-2"
                            onClick={handleDelete}>
                            <i className="fas fa-trash"/>
                        </button>
                    )}
                </div>
            </div>

            <Operations
                operations={operations}
                taskId={task.id}
                form={form}
                setForm={setForm}
                setOperations={setOperations}
                status={task.status}
            />

        </section>
    );
};

export default Task;

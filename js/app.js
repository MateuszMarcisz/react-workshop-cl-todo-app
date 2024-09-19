import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {getTasks} from "./api/getTasks";
import Task from "./components/Task";
import NewTask from "./components/NewTask";


const container = document.getElementById("app");
const root = createRoot(container);

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);


    const fetchTasks = () => {
        getTasks((fetchedTasks) => {
            setTasks(fetchedTasks);
        });
    };


    const addTask = (newTask) => {
        fetchTasks();
    };

    return (
        <>
            <div>
                <NewTask addTask={addTask}/>
            </div>
            <div>
                <br/>
                <h1 className="text-center">Task List</h1>
                {tasks.length > 0 ? (
                    <ul>
                        {tasks.map((task) => (
                            <Task key={task.id} task={task}/>
                        ))}
                    </ul>
                ) : (
                    <p>Loading tasks...</p>
                )}
            </div>
        </>
    );
};

root.render(<App/>);

import {API_KEY, API_URL} from "./constants";

/**
 * Update a task
 * @param {number} taskId - ID of the task to update
 * @param {object} taskData - Updated task data
 * @param {function} successCallback - Function to call on success
 */
export const finishTask = async (taskId, taskData, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': API_KEY,
            },
            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            successCallback();
        } else {
            console.error("Failed to update task status:", response.statusText);
        }
    } catch (error) {
        console.error("Error updating task:", error);
    }
};
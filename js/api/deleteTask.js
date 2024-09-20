import {API_KEY, API_URL} from "./constants";

/**
 * Delete a task
 * @param {number} taskId - ID of the task to update
 * @param {function} successCallback - Function to call on success
 */
export const deleteTask = async (taskId, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': API_KEY,
            },
        });
        if (response.ok) {
            successCallback();
        } else {
            console.error("Failed to delete task:", response.statusText);
        }
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};
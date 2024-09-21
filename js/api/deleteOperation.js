import {API_KEY, API_URL} from "./constants";

/**
 * Delete a task
 * @param {number} id - ID of the operation to delete
 * @param {function} successCallback - Function to call on success
 */
export const deleteOperation = async (id, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/operations/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': API_KEY,
            },
        });
        if (response.ok) {
            successCallback();
        } else {
            console.error("Failed to delete operation:", response.statusText);
        }
    } catch (error) {
        console.error("Error deleting operation:", error);
    }
};
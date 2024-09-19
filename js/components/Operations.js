import React from 'react';

const Operations = ({operations}) => {
    return (
        <div>
            <h3>Operations:</h3>
            {operations.length > 0 ? (
                <ul>
                    {operations.map((operation) => (
                        <li key={operation.id}>
                            {operation.description} - Time spent: {operation.timeSpent} minutes
                        </li>
                    ))}
                </ul>
            ) : (
                <p>This task has no operations yet.</p>
            )}
        </div>
    );
};

export default Operations;
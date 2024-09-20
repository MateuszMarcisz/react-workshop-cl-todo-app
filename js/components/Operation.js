import React from 'react';

const Operation = ({description, onRemoveOperation, status, timeSpent}) => {
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

            {/*{false && <form>*/}
            {/*    <div*/}
            {/*        className="input-group input-group-sm">*/}
            {/*        <input type="number"*/}
            {/*               className="form-control"*/}
            {/*               placeholder="Spent time in minutes"*/}
            {/*               style={{width: '12rem'}}/>*/}
            {/*        <div className="input-group-append">*/}
            {/*            <button className="btn btn-outline-success">*/}
            {/*                <i className="fas fa-save"/>*/}
            {/*            </button>*/}
            {/*            <button className="btn btn-outline-dark">*/}
            {/*                <i className="fas fa-times false"/>*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</form>}*/}

            <div>

                {status === 'open' &&
                    <button
                        className="btn btn-outline-success btn-sm mr-2"

                    >
                        Add time
                        <i className="fas fa-clock ml-1"></i>
                    </button>}


                <button
                    className="btn btn-outline-danger btn-sm"

                >
                    <i className="fas fa-trash"></i>
                </button>

            </div>

        </li>
    );
};

export default Operation;
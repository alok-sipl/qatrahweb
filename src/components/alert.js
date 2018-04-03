import React, {Component} from 'react';


const Alert = (props) => {
    return (
        <div>
            <ul className="list-items">
                {props.alerts.length}
            </ul>
        </div>
    );
};

export default Alert;


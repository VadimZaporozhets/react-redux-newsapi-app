import React from 'react';

const ErrorComponent = ({errMessage}) => {
    return (
        <div className="error-container">
        {console.log(errMessage)}
            <p className="error-text">{errMessage}</p>
        </div>
    )
}

export default ErrorComponent;
import React from 'react';
import loader from '../loader.gif';

const WithLoading = (Component) => {
  return ({ isLoading, ...props }) => {
    if (!isLoading) return (<Component {...props} />);
    return (<img className="loader" alt="loader" src={loader}/>);
  }
}

export default WithLoading;
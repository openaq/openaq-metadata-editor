import React from 'react';

const ErrorMessage = props => {
  return (
    <div className={props.style}>
      {props.message}
      {props.retry ? (
        <button
          type='button'
          className='button button--medium button--primary-bounded'
          onClick={(e) => props.retry()}>
              Retry
        </button>
      ) : null}
    </div>
  );
};

export default ErrorMessage;

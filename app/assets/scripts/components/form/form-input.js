import React from 'react';
import Asterisk from './asterisk';

const FormInput = ({ title, type, value, onChange, isTooltopShowing, description, required }) => {
  return (
    <React.Fragment>
      <label className='form__label'>
        {title}
        <Asterisk required={required}/>
      </label>
      <div className='tooltip'>
        <input
          type={type}
          className='form__control'
          value={value}
          onChange={onChange}
        />
        {isTooltopShowing ? (
          <div>
            <button className='tooltip-button button button--primary-bounded'>i</button>
            <span className='tooltip-info'>{description}</span>
          </div>
        ) : null }
      </div>
    </React.Fragment>
  );
};

export default FormInput;

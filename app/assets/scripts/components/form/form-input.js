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
          <React.Fragment>
            <i className='tooltip-button edit-box-delete collecticons collecticons-circle-information'/>
            <span className='tooltip-info'>{description}</span>
          </React.Fragment>
        ) : null }
      </div>
    </React.Fragment>
  );
};

export default FormInput;

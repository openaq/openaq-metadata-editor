import React from 'react';
import Asterisk from './asterisk';

const FormInput = ({ title, type, value, onChange, description, required }) => {
  return (
    <React.Fragment>
      <label className='form__label'>
        {title}
        <Asterisk required={required}/>
      </label>
      <div className='tooltip-container'>
        <input
          type={type}
          className='form__control'
          value={value}
          onChange={onChange}
        />
        <div className='tooltip'>
          <i className='tooltip-button edit-box-delete collecticons collecticons-circle-information'/>
          <span className='tooltip-info'>{description}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FormInput;

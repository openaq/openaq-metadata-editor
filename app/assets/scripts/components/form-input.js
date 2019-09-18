import React from 'react';

const Asterisk = ({ required }) => {
  if (!required) return null;
  return (<span className='required'>*</span>);
};

const FormInput = props => {
  return (
    <React.Fragment>
      <label className='form__label'>
        {props.title}
        <Asterisk required={props.required}/>
      </label>
      <div className='tooltip'>
        <input
          type={props.type}
          className='form__control'
          value={props.value}
          onChange={props.onChange}
        />
        <button className='tooltip-button button button--primary-bounded'>i</button>
        <span className='tooltip-info'>{props.description}</span>
      </div>
    </React.Fragment>
  );
};

export default FormInput;

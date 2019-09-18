import React from 'react';

const Asterisk = ({ required }) => {
  if (!required) return null;
  return (<span className='required'>*</span>);
};

const FormInput = ({ title, type, value, onChange, isTooltopShowing, description }) => {
  // const {title, type, value, onChange, isTooltopShowing, description } = props;
  return (
    <React.Fragment>
      <label className='form__label'>
        {title}
        <Asterisk required={title}/>
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

import React from 'react';

const Asterisk = ({ required }) => {
  if (!required) return null;
  return (<span className='required'>*</span>);
};

const FormSelect = ({ title, type, value, onChange, isTooltopShowing, description, required }) => {
  return (
    <React.Fragment>
      <label className='form__label'>
        {title}
        <Asterisk required={required}/>
      </label>
      <div className='tooltip'>
        <Select
          value={{ key: value, label: value }}
          options={options}
          onChange={onChange}
          getOptionValue={(option) => {
            return option.key;
          }}
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

export default FormSelect;

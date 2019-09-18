import React, { Component } from 'react';
import Asterisk from './asterisk';
import Select from 'react-select';

{/* <FormSelect 
required={props.required}
title={props.title}
availableValues={prop.enum}
onChange={(val) => {this.propUpdate(key, val.key);}}
value={value}
/> */}

class FormSelect extends Component {
  render () {
    const { title, value, onChange, isTooltopShowing, description, required, availableValues } = this.props;

    let options;
    if (availableValues) {
      options = availableValues.map((k) => ({ key: k, label: k }));

      // Adds an option for users to deselect item
      const deselectValue = { key: '', label: 'Select One' };
      options.unshift(deselectValue);
    }

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
  }
}

export default FormSelect;

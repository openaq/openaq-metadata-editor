import React from 'react';
import Select from 'react-select';

class SelectFilter extends React.Component {
  onChange (value) {
    this.props.onChange(value);
  }

  render () {
    const { name, value, options } = this.props;

    return (
      <div className='filter-input filter-select'>
        <h3>{name}</h3>
        <Select
          isMulti
          value={value}
          onChange={(val) => this.onChange(val)}
          options={options}
        />
      </div>
    );
  }
}

export default SelectFilter;

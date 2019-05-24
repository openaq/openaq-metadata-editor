import React from 'react';
import InputRange from 'react-input-range';

class RangeFilter extends React.Component {
  onChange (value) {
    console.log('RangeFilter value', value)
    this.props.onChange(value);
  }

  render () {
    const { name, value, options } = this.props;

    return (
      <div className='filter-input filter-range'>
        <h3>{name}</h3>
        <InputRange
          step={1}
          minValue={options.min}
          maxValue={options.max}
          value={value}
          allowSameValues={false}
          onChange={value => this.onChange(value)}
          /* formatLabel={(value) => this.formatLabel(value)} */
        />
      </div>
    );
  }
}

export default RangeFilter;

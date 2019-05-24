import React from 'react';
import DatePicker from 'react-datepicker';

class DateFilter extends React.Component {
  onStartChange (start) {
    const { value: { end } } = this.props;
    this.props.onChange({ start, end });
  }

  onEndChange (end) {
    const { value: { start } } = this.props;
    this.props.onChange({ start, end });
  }

  render () {
    const { name, value } = this.props;

    return (
      <div className='filter-input filter-date'>
        <h3>{name}</h3>
        <label>Start:</label>
        <DatePicker
          selected={value.start}
          selectsStart
          startDate={value.start}
          endDate={value.end}
          onChange={(val) => this.onStartChange(val)}
        />

        <label>End:</label>
        <DatePicker
          selected={value.end}
          selectsEnd
          startDate={value.start}
          endDate={value.end}
          onChange={(val) => this.onEndChange(val)}
        />
      </div>
    );
  }
}

export default DateFilter;

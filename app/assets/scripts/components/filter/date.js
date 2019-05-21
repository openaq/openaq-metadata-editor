import React from 'react';
import DatePicker from 'react-datepicker';

class DateFilter extends React.Component {
  onStartChange (start) {
    const { end } = this.props;
    this.props.onChange({ start, end });
  }

  onEndChange (end) {
    const { start } = this.props;
    this.props.onChange({ start, end });
  }

  render () {
    const { name } = this.props;

    return (
      <div className='filter-input filter-date'>
        <h3>{name}</h3>
        <DatePicker
          selected={this.props.start}
          selectsStart
          startDate={this.props.start}
          endDate={this.props.end}
          onChange={(value) => this.onStartChange(value)}
        />

        <DatePicker
          selected={this.props.end}
          selectsEnd
          startDate={this.props.start}
          endDate={this.props.end}
          onChange={(value) => this.onEndChange(value)}
        />
      </div>
    );
  }
}

export default DateFilter;

import React from 'react';

class RangeFilter extends React.Component {
  render () {
    const { name } = this.props;

    return (
      <div className='filter-input filter-range'>
        <h3>{name}</h3>
      </div>
    );
  }
}

export default RangeFilter;

import React from 'react';

class SelectFilter extends React.Component {
  render () {
    const { name } = this.props;

    return (
      <div className='filter-input filter-select'>
        <h3>{name}</h3>
      </div>
    );
  }
}

export default SelectFilter;

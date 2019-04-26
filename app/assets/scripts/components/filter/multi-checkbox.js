import React from 'react';

class MultiCheckboxFilter extends React.Component {
  constructor (props) {
    super(props)
    this.state = { selected: {} }
  }

  onChange (e) {
    const { selected } = this.state
    const { name, checked } = e.target

  }

  renderCheckbox () {
    const onChange

    return (
      <input
        type='checkbox'
        name={name}
        checked={checked}
        onChange={(e) => {
          this.onChange(e)
        }}
      />
    );
  }

  render () {
    const { onChange, options } = this.props

    return (
      <div className='multi-checkbox'>

      </div>
    );
  }
}

export default MultiCheckboxFilter;

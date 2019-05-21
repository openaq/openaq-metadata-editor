import React from 'react';

class MultiCheckboxFilter extends React.Component {
  onChange (e) {
    const { value } = this.props;
    const { name, checked } = e.target;
    value[name] = checked;
    this.props.onChange(value);
  }

  renderCheckbox (option) {
    const selected = this.props.value;
    const checked = selected[option];

    return (
      <div key={`checkbox-${option}`}>
        <input
          type='checkbox'
          name={option}
          id={`checkbox-${option}`}
          value={checked || ''}
          checked={checked || ''}
          onChange={(e) => {
            this.onChange(e);
          }}
        />
        <label htmlFor={`checkbox-${option}`}>{option}</label>
      </div>
    );
  }

  render () {
    const { options, name } = this.props;

    return (
      <div className='filter-input filter-multicheckbox'>
        <h3>{name}</h3>
        { options.map((option) => this.renderCheckbox(option))}
      </div>
    );
  }
}

export default MultiCheckboxFilter;

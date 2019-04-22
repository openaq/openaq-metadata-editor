import React from 'react';

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: null
    };
  }

  onChange (value) {
    this.setState({ value });
  }

  onSubmit () {
    const { value } = this.state;
    this.props.onChange(value);
  }

  render () {
    return (
      <div className='search'>
        <input
          type='text'
          placeholder='Station ID, City, Country'
          onChange={(v) => this.onChange(v)}
        />
        <button
          onClick={() => this.onSubmit()}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;

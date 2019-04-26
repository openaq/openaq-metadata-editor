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
      <form className='search' onSubmit={() => this.onSubmit()}>
        <input
          type='text'
          placeholder='Location ID, City, Country'
          onChange={(v) => this.onChange(v)}
        />
        <button
          className='search-button'
          onClick={() => this.onSubmit()}
        >
          <span className='collecticons collecticons-magnifier-left'></span>
        </button>
      </form>
    );
  }
}

export default Search;

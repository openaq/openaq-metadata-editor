import React from 'react';

import Header from '../components/header';
import Search from '../components/search';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: null
    };
  }

  onChange (value) {
    this.setState({ value });
  }

  render () {
    return (
      <div className='page page--homepage'>
        <Header>
          <h1 classNAme='page__title'>Search stations</h1>
          <Search onChange={(v) => this.onChange(v)} />
        </Header>
        <main role='main'>

        </main>
      </div>
    );
  }
}

export default Home;

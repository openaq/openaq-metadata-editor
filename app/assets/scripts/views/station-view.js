import React from 'react';

import Header from '../components/header';

class Home extends React.Component {
  render () {
    return (
      <div className='page page--homepage'>
        <Header>
          <h1 classNAme='page__title'>Station-ID</h1>
        </Header>
      </div>
    )
  }
}

export default Home

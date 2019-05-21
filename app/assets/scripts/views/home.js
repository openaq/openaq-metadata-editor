import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';
import Search from '../components/search';
import Filter from '../components/filter';
import Table from '../components/table';

import locations from '../tests/fixtures/locations.json';

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
          <h1 className='page__title'>Search locations</h1>
          <Search onChange={(v) => this.onChange(v)} />
        </Header>
        <main role='main'>
          <Filter locations={locations} />
          <Table locations={locations} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

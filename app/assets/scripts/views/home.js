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
      search: null,
      filter: null
    };
  }

  onSearchChange (value) {
    this.setState({ search: value });
  }

  onFilterChange (value) {
    this.setState({ filter: value });
  }

  render () {
    const { search, filter } = this.state;
    const { history } = this.props;

    return (
      <div className='page page--homepage'>
        <Header>
          <h1 className='page__title'>Search locations</h1>
          <Search onChange={(v) => this.onSearchChange(v)} />
        </Header>
        <main role='main'>
          <Filter locations={locations} />
          <Table locations={locations} search={search} filter={filter} history={history} />
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

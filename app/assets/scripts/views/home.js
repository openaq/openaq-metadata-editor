import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';
import Search from '../components/search';
import Filter from '../components/filter';
import Table from '../components/table';

import { getMetadataList } from '../state/locations/actions';

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

  componentDidMount () {
    this.props.getMetadataList();
  }

  render () {
    const { search, filter } = this.state;
    const { history, metadataList } = this.props;

    return (
      <div className='page page--homepage'>
        <Header>
          <h1 className='page__title'>Search locations</h1>
          <Search onChange={(v) => this.onSearchChange(v)} />
        </Header>
        <main role='main'>
          <Filter locations={metadataList} />
          <Table
            locations={metadataList}
            search={search}
            filter={filter}
            history={history}
          />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    metadataList: state.locations.metadataList.results
  };
};

const mapDispatchToProps = {
  getMetadataList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

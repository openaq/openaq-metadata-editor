import React from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';

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
      filter: null,
      activePage: 1
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

  handlePageChange (pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  render () {
    const { search, filter, activePage } = this.state;
    const { history, metadataList } = this.props;
    if (!metadataList) return <div></div>;
    const listSlice = metadataList.slice((activePage - 1) * 10, (activePage - 1) * 10 + 10);

    return (
      <div className='page page--homepage'>
        <Header>
          <h1 className='page__title'>Search locations</h1>
          <Search onChange={(v) => this.onSearchChange(v)} />
        </Header>
        <main role='main'>
          <Filter locations={listSlice} />
          <Table
            locations={listSlice}
            search={search}
            filter={filter}
            history={history}
          />
          <Pagination
            activePage={activePage}
            totalItemsCount={metadataList.length}
            onChange={this.handlePageChange.bind(this)}
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

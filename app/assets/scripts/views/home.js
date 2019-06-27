import React from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';

import Header from '../components/header';
import Search from '../components/search';
import Filter from '../components/filter';
import Table from '../components/table';
import debounce from 'lodash.debounce';

import { getMetadataList } from '../state/locations/actions';
import { setFilters } from '../state/filters/actions';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      search: null,
      filter: null,
      activePage: 1
    };

    this.getList = debounce((page) => {
      this.props.getMetadataList({ limit: 10, page: page || 1 });
    }, 300).bind(this);
  }

  onSearchChange (value) {
    this.setState({ search: value });
  }

  onFilterChange (filter) {
    this.props.setFilters(filter);
    this.getList();
  }

  componentDidMount () {
    this.getList();
  }

  handlePageChange (pageNumber) {
    this.setState({ activePage: pageNumber });
    this.getList(pageNumber);
  }

  render () {
    const { search, activePage } = this.state;
    const { history, metadataList, totalListLength, filters } = this.props;
    if (!metadataList) return <div />;

    return (
      <div className='page page--homepage'>
        <Header>
          <h1 className='page__title'>Search locations</h1>
          <Search onChange={(v) => this.onSearchChange(v)} />
        </Header>
        <main role='main'>
          <Filter
            locations={metadataList}
            filters={filters}
            onChange={this.onFilterChange.bind(this)}
          />
          <section className='fold'>
            <div className='inner'>
              <Table
                locations={metadataList}
                search={search}
                history={history}
              />
              <Pagination
                activePage={activePage}
                totalItemsCount={totalListLength}
                onChange={this.handlePageChange.bind(this)}
                hideFirstLastPages
                nextPageText=''
                prevPageText=''
                innerClass='paginator'
                itemClass='paginator__wrapper'
                itemClassPrev='previous'
                itemClassNext='next'
              />
            </div>
          </section>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalListLength: state.locations.metadataList.meta.found,
    metadataList: state.locations.metadataList.results,
    filters: state.filters
  };
};

const mapDispatchToProps = {
  getMetadataList,
  setFilters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

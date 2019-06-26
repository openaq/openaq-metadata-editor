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
    this.props.getMetadataList({ limit: 10, page: 1 });
  }

  handlePageChange (pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.getMetadataList({ limit: 10, page: pageNumber });
  }

  render () {
    const { search, filter, activePage } = this.state;
    const { history, metadataList, totalListLength } = this.props;
    if (!metadataList) return <div />;

    return (
      <div className='page page--homepage'>
        <Header>
          <h1 className='page__title'>Search locations</h1>
          <Search onChange={(v) => this.onSearchChange(v)} />
        </Header>
        <main role='main'>
          <Filter locations={metadataList} />
          <section className='fold'>
            <div className='inner'>
              <Table
                locations={metadataList}
                search={search}
                filter={filter}
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

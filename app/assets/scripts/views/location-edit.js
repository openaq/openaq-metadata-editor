import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';

class LocationEdit extends React.Component {
  render () {
    return (
      <div className='page page--homepage'>
        <Header>
          <h1 classNAme='page__title'>Edit metadata</h1>
        </Header>
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
)(LocationEdit);

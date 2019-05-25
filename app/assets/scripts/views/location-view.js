import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';
import Map from '../components/map';

class LocationView extends React.Component {
  render () {
    return (
      <div className='page page--homepage'>
        <Header>
          <h1 className='page__title'>Location ID</h1>
          <h2 className='page__title'>Location Name</h2>
          <h3 className='page__title'>City, Country</h3>
        </Header>
        <main role='main'>
          <div className='inner'>
            <ul>
              <li>Location: {``}</li>
              <li>City: {``}</li>
              <li>Country: {``}</li>
              <li>Latitude: {``}</li>
              <li>Longitude: {``}</li>
              <li>Location Type: {``}</li>
            </ul>

            <Map coordinates={{ lat: 47, lon: -122 }} />

            <h2 className='location-view-header'>
              Instruments
            </h2>



            <h2 className='location-view-header'>
              Maintenance
            </h2>



            <h2 className='location-view-header'>
              Site Description
            </h2>
          </div>
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
)(LocationView);

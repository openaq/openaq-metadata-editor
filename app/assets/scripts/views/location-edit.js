import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import Header from '../components/header';
import Map from '../components/map';

class LocationEdit extends React.Component {
  render () {
    return (
      <div className='page page--homepage'>
        <Header>
          <h1 classNAme='page__title'>Edit metadata</h1>
        </Header>
        <main role='main'>
          <div className='inner-edit'>
            <div className='location-edit-details'>
              <h2>Location ID</h2>
              <h3>{'location id'}</h3>
              <ul>
                <li>Location: {``}</li>
                <li>City: {``}</li>
                <li>Country: {``}</li>
                <li>Latitude: {``}</li>
                <li>Longitude: {``}</li>
              </ul>
              <Map coordinates={{ lat: 47, lon: -122 }} />
            </div>

            <div className='edit-box instrument-edit'>
              <div className='edit-box-toggle'>
                Maintenance
              </div>
              <div className='edit-box-content'>
                <label>Instrument Pollutants</label>
                <Select
                  /* TODO: select options for pollutants */
                />

                <label>Model Name</label>
                <input type='text' />

                <label>Manufacturer</label>
                <input type='text' />

                <label>Raw Frequency</label>
                <input type='text' />

                <label>Reporting Frequency</label>
                <input type='text' />
              </div>
            </div>

            <div className='edit-box instrument-edit'>
              <div className='edit-box-toggle'>
                Site Description
              </div>
              <div className='edit-box-content'>
                <label>Instrument Pollutants</label>
                <Select
                  /* TODO: select options for pollutants */
                />

                <label>Model Name</label>
                <input type='text' />

                <label>Manufacturer</label>
                <input type='text' />

                <label>Raw Frequency</label>
                <input type='text' />

                <label>Reporting Frequency</label>
                <input type='text' />
              </div>
            </div>

            <h2 className='location-view-header'>
              Instruments
            </h2>
            <div className='edit-box instrument-edit'>
              <div className='edit-box-toggle'>
                Instrument {1}
              </div>
              <div className='edit-box-content'>
                <label>Instrument Pollutants</label>
                <Select
                  /* TODO: select options for pollutants */
                />

                <label>Model Name</label>
                <input type='text' />

                <label>Manufacturer</label>
                <input type='text' />

                <label>Raw Frequency</label>
                <input type='text' />

                <label>Reporting Frequency</label>
                <input type='text' />
              </div>
            </div>

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
)(LocationEdit);

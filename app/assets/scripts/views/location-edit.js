import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import Header from '../components/header';
import Map from '../components/map';

class LocationEdit extends React.Component {
  render () {
    return (
      <div className='page page--location-edit'>
        <Header>
          <h1 classNAme='page__title'>Edit metadata</h1>
        </Header>
        <main role='main'>
          <div className='flex edit-container justify-between'>
            <div className='location-edit-details'>
              <h2>Location ID</h2>
              <h3>{'location id'}</h3>
              <ul className='location-detail-list'>
                <li>Location: <b>{`Seattle-10th & Welle`}</b></li>
                <li>City: <b>{`Seattle`}</b></li>
                <li>Country: <b>{`United States`}</b></li>
                <li>Latitude: <b>{`47.597`}</b></li>
                <li>Longitude: <b>{`-122.32`}</b></li>
                <li>Location Type: <b>{`Urban`}</b></li>
              </ul>
            </div>

            <Map zoom={10} coordinates={{ lat: 47.597, lon: -122.32 }} />
          </div>

          <div className='inner-edit'>
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
                <input type='text' className='form__control' />

                <label>Manufacturer</label>
                <input type='text' className='form__control' />

                <label>Raw Frequency</label>
                <input type='text' className='form__control' />

                <label>Reporting Frequency</label>
                <input type='text' className='form__control' />
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
                <input type='text' className='form__control' />

                <label>Manufacturer</label>
                <input type='text' className='form__control' />

                <label>Raw Frequency</label>
                <input type='text' className='form__control' />

                <label>Reporting Frequency</label>
                <input type='text' className='form__control' />
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
                <input type='text' className='form__control' />

                <label>Manufacturer</label>
                <input type='text' className='form__control' />

                <label>Raw Frequency</label>
                <input type='text' className='form__control' />

                <label>Reporting Frequency</label>
                <input type='text' className='form__control' />
              </div>
            </div>

            <div className='flex justify-between'>
              <button type='button' className='button button--medium button--primary-bounded'>Add Another Instrument</button>
              <button type='button' className='button button--medium button--primary'>Save Location</button>
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

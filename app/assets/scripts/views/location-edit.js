import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import Header from '../components/header';
import Map from '../components/map';

import { schemas } from 'openaq-data-format';

const locationSchema = schemas.location;

const excludePropertiesFromEditing = [
  'id',
  'coordinates',
  'city',
  'country',
  'instruments'
];

const propertiesToEdit = Object.keys(locationSchema.properties)
  .filter((key) => !excludePropertiesFromEditing.includes(key))
  .map((key) => {
    const prop = locationSchema.properties[key];
    prop.key = key;
    return prop;
  });

const maintenanceProperties = [
  'active',
  'activationDate',
  'deactivationDate'
];

const editorGroups = {
  siteDetails: {
    name: 'Site Details',
    properties: propertiesToEdit.filter((prop) => !maintenanceProperties.includes(prop.key))
  },
  maintenance: {
    name: 'Maintenance',
    properties: propertiesToEdit.filter((prop) => maintenanceProperties.includes(prop.key))
  }
};

console.log('editorGroups', editorGroups)

class LocationEdit extends React.Component {
  renderFormWithSchema (schema) {

  }

  render () {
    return (
      <div className='page page--location-edit'>
        <Header>
          <h1 classNAme='page__title'>Edit metadata</h1>
        </Header>
        <main role='main'>
          <div className='flex edit-container justify-between'>
            <div className='location-edit-details'>
              <h1 className='page__title'>
                Location ID
                <span className='location-id'>9203184789012m34</span>
              </h1>
              <ul className='location-detail-list'>
                <li>Location: <b>{`Seattle-10th & Welle`}</b></li>
                <li>City: <b>{`Seattle`}</b></li>
                <li>Country: <b>{`United States`}</b></li>
                <li>Latitude: <b>{`47.597`}</b></li>
                <li>Longitude: <b>{`-122.32`}</b></li>
                <li>Location Type: <b>{`Urban`}</b></li>
              </ul>
            </div>

            <Map zoom={10} coordinates={{ lat: 47.597, lon: -122.32 }} width={300} />
          </div>

          <div className='inner-edit'>
            <div className='edit-box instrument-edit'>
              <div className='edit-box-toggle'>
                Site Details
              </div>
              <div className='edit-box-content'>
                <label className='form__label'>Activation Date</label>
                <input type='text' className='form__control' />

                <label className='form__label'>De-activation Date</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Elevation (meters)</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Attribution</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Site Type</label>
                <Select
                  options={[{ key: 'urban', label: 'urban' }, { key: 'suburban', label: 'suburban' }, { key: 'rural', label: 'rural' }]}
                  /* TODO: state */
                />

                <label className='form__label'>Source Type</label>
                <Select
                  options={[{ key: 'government', label: 'government' }, { key: 'research', label: 'research' }, { key: 'other', label: 'other' }]}
                  /* TODO: state */
                />

                <label className='form__label'>Notes</label>
                <textarea className='form__control'></textarea>
              </div>
            </div>

            <div className='edit-box instrument-edit'>
              <div className='edit-box-toggle'>
                Maintenance
              </div>
              <div className='edit-box-content'>
                <label className='form__label'>Model Name</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Manufacturer</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Raw Frequency</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Reporting Frequency</label>
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
                <label className='form__label'>Instrument Pollutants</label>
                <Select
                  isMulti
                  options={[
                    { key: 'pm2.5', label: 'pm2.5' },
                    { key: 'pm10', label: 'pm10' },
                    { key: 'co', label: 'co' },
                    { key: 'bc', label: 'bc' },
                    { key: 'so2', label: 'so2' },
                    { key: 'no2', label: 'no2' },
                    { key: 'o3', label: 'o3' }
                  ]}
                  /* TODO: state */
                />

                <label className='form__label'>active</label>
                <input type='checkbox' checked='true' className='form__control' />

                <label className='form__label'>Serial Number</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Instrument type</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Activation Date</label>
                <input type='text' className='form__control' />

                <label className='form__label'>De-activation Date</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Model Name</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Manufacturer</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Measurement Style</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Raw Frequency</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Reporting Frequency</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Calibration procedures</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Inlet Height</label>
                <input type='text' className='form__control' />

                <label className='form__label'>Notes</label>
                <textarea className='form__control'></textarea>
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

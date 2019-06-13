import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { schemas } from 'openaq-data-format';

import Header from '../components/header';
import Map from '../components/map';

import { getMetadata, putMetadata } from '../state/locations/actions';

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

console.log('editorGroups', editorGroups);

class LocationEdit extends React.Component {
  componentDidMount () {
    const { match: { params: { id } } } = this.props;

    if (!this.props.metadata) {
      this.props.getMetadata(id);
    }
  }

  renderInfo () {
    const { metadata } = this.props;

    return (
      <div className='flex edit-container justify-between'>
        <div className='location-edit-details'>
          <h1 className='page__title'>
            Location ID
            <span className='location-id'>{metadata.locationId}</span>
          </h1>
          <ul className='location-detail-list'>
            {/* TODO: make sure location, city, country exist */}
            <li>Location: <b>{metadata.location}</b></li>
            <li>City: <b>{metadata.city}</b></li>
            <li>Country: <b>{metadata.country}</b></li>
            <li>Latitude: <b>{metadata.data.coordinates.latitude}</b></li>
            <li>Longitude: <b>{metadata.data.coordinates.longitude}</b></li>
            <li>Location Type: <b>{metadata.data.siteType}</b></li>
          </ul>
        </div>

        <Map
          zoom={10}
          width={300}
          coordinates={{
            lat: metadata.data.coordinates.latitude,
            lon: metadata.data.coordinates.longitude
          }}
        />
      </div>
    );
  }

  renderStringProp (prop) {
    return (
      <React.Fragment>
        <label className='form__label'>{prop.title}</label>
        <input type='text' className='form__control' />
      </React.Fragment>
    );
  }

  renderIntegerProp (prop) {
    return (
      <React.Fragment>
        <label className='form__label'>{prop.title}</label>
        <input type='number' className='form__control' />
      </React.Fragment>
    );
  }

  renderBooleanProp (prop) {
    return (
      <React.Fragment>
        <label className='form__label'>{prop.title}</label>
        <input type='checkbox' checked='true' className='form__control' />
      </React.Fragment>
    );
  }

  renderArrayProp (prop) {
    let options;

    if (prop.items.enum) {
      options = prop.items.enum.map((key) => {
        return { key, label: key };
      });
    }

    return (
      <React.Fragment>
        <label className='form__label'>{prop.title}</label>
        <Select
          options={options}
          /* TODO: state */
        />
      </React.Fragment>
    );
  }

  renderEditSection (section) {
    return (
      <div className='edit-box instrument-edit'>
        <div className='edit-box-toggle'>
          {section.name}
        </div>
        <div className='edit-box-content'>
          {
            section.properties.map((prop) => {
              switch (prop.type) {
                case 'string':
                  return this.renderStringProp(prop);
                case 'integer':
                  return this.renderIntegerProp(prop);
                case 'array':
                  return this.renderArrayProp(prop);
              }
            })
          }
        </div>
      </div>
    );
  }

  renderMetadataForm () {
    const { metadata } = this.props;
    if (!metadata) return null;
    return (
      <main role='main'>
        {this.renderInfo()}

        <div className='inner-edit'>
          {this.renderEditSection(editorGroups.siteDetails)}
          {this.renderEditSection(editorGroups.maintenance)}

          <h2 className='location-view-header'>
            Instruments
          </h2>
          <div className='edit-box instrument-edit'>
            {

            }
          </div>

          <div className='flex justify-between'>
            <button type='button' className='button button--medium button--primary-bounded'>Add Another Instrument</button>
            <button type='button' className='button button--medium button--primary'>Save Location</button>
          </div>
        </div>
      </main>
    );
  }

  render () {
    return (
      <div className='page page--location-edit'>
        <Header>
          <h1 classNAme='page__title'>Edit metadata</h1>
        </Header>
        {this.renderMetadataForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    metadata: state.locations.metadata
  };
};

const mapDispatchToProps = {
  getMetadata,
  putMetadata
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationEdit);

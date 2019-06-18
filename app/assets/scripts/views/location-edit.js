import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import keypath from 'obj-keypath';

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

class LocationEdit extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      metadata: {}
    };
  }

  componentDidMount () {
    const { match: { params: { id } } } = this.props;

    if (!this.props.metadata) {
      this.props.getMetadata(id);
    }
  }

  propUpdate (key, value) {
    const metadata = Object.assign({}, this.state.metadata);
    keypath.set(metadata, key, value);
    this.setState({ metadata });
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

  renderStringProp (prop, initialValue) {
    const { metadata } = this.state;
    const value = metadata[prop.key] || initialValue;

    const onChange = (e) => {
      this.propUpdate(prop.key, e.target.value);
    };

    return (
      <React.Fragment key={`form-field-${prop.key}`}>
        <label className='form__label'>{prop.title}</label>
        <input
          type='text'
          className='form__control'
          value={value}
          onChange={onChange}
        />
      </React.Fragment>
    );
  }

  renderIntegerProp (prop, initialValue) {
    const { metadata } = this.state;
    const value = metadata[prop.key] || initialValue;

    const onChange = (e) => {
      this.propUpdate(prop.key, e.target.value);
    };

    return (
      <React.Fragment key={`form-field-${prop.key}`}>
        <label className='form__label'>{prop.title}</label>
        <input
          type='number'
          className='form__control'
          value={value}
          onChange={onChange}
        />
      </React.Fragment>
    );
  }

  renderBooleanProp (prop, initialValue) {
    const { metadata } = this.state;
    const value = metadata[prop.key] || initialValue;

    const onChange = (e) => {
      this.propUpdate(prop.key, e.target.checked);
    };

    return (
      <React.Fragment key={`form-field-${prop.key}`}>
        <label className='form__label'>{prop.title}</label>
        <input
          type='checkbox'
          value={value}
          className='form__control'
          onChange={onChange}
        />
      </React.Fragment>
    );
  }

  renderSelectProp (prop, initialValue) {
    const { metadata } = this.state;
    const value = metadata[prop.key] || initialValue;

    const availableValues = prop.enum;

    let options;
    if (availableValues) {
      options = availableValues.map((key) => {
        return { key, label: key };
      });
    }

    const onChange = (val) => {
      this.propUpdate(prop.key, val.key);
    };

    return (
      <React.Fragment key={`form-field-${prop.key}`}>
        <label className='form__label'>{prop.title}</label>
        <Select
          value={{ key: value, label: value }}
          options={options}
          onChange={onChange}
          getOptionValue={(option) => {
            return option.key;
          }}
        />
      </React.Fragment>
    );
  }

  renderMultiSelectProp (prop, initialValue) {
    const { metadata } = this.state;
    const value = metadata[prop.key] || initialValue;

    const availableValues = prop.items.enum;

    let options;
    if (availableValues) {
      options = availableValues
        .map((key) => {
          return { key, label: key };
        });
    }

    const onChange = (value) => {
      this.propUpdate(prop.key, value);
    };

    return (
      <React.Fragment key={`form-field-${prop.key}`}>
        <label className='form__label'>{prop.title}</label>
        <Select
          isMulti
          value={value}
          options={options}
          onChange={onChange}
          getOptionValue={(option) => {
            return option.key;
          }}
        />
      </React.Fragment>
    );
  }

  renderEditSection (section) {
    const { metadata } = this.props;

    return (
      <div className='edit-box instrument-edit'>
        <div className='edit-box-toggle'>
          {section.name}
        </div>
        <div className='edit-box-content'>
          {
            section.properties.map((prop) => {
              const initialValue = metadata.data[prop.key];
              switch (prop.type) {
                case 'string':
                  return prop.enum
                    ? this.renderSelectProp(prop, initialValue)
                    : this.renderStringProp(prop, initialValue);
                case 'integer':
                  return this.renderIntegerProp(prop, initialValue);
                case 'array':
                  return this.renderMultiSelectProp(prop, initialValue);
                case 'boolean':
                  return this.renderBooleanProp(prop, initialValue);
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
            <button
              type='button'
              className='button button--medium button--primary-bounded'
              onClick={(e) => this.onAddInstrumentClick(e)}
            >
              Add Another Instrument
            </button>
            <button
              type='button'
              className='button button--medium button--primary'
              onClick={(e) => this.onSaveLocationClick(e)}
            >
              Save Location
            </button>
          </div>
        </div>
      </main>
    );
  }

  onAddInstrumentClick () {

  }

  onSaveLocationClick () {
    const { match } = this.props;

    const metadata = Object.assign(
      {},
      this.props.metadata.data,
      this.state.metadata
    );

    this.props.putMetadata(match.params.id, metadata);
  }

  render () {
    return (
      <div className='page page--location-edit'>
        <Header>
          <h1 className='page__title'>Edit metadata</h1>
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

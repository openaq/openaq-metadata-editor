import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import keypath from 'obj-keypath';
import DatePicker from 'react-datepicker';
import parse from 'date-fns/parse';

import { schemas } from 'openaq-data-format';

import Header from '../components/header';
import Map from '../components/map';

import { getMetadata, putMetadata, updateMetadata } from '../state/locations/actions';

const locationSchema = schemas.location;

const excludePropertiesFromEditing = [
  'id',
  'coordinates',
  'city',
  'country',
  'instruments',
  'parameters',
  'attribution'
];

const propertiesToEdit = Object.keys(locationSchema.properties)
  .filter((key) => !excludePropertiesFromEditing.includes(key))
  .map((key) => {
    const prop = locationSchema.properties[key];
    prop.key = key;
    return prop;
  });

const instrumentProperties = Object.keys(locationSchema.properties.instruments.items.properties)
  .map((key) => {
    const prop = locationSchema.properties.instruments.items.properties[key];
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
  },
  instrument: {
    name: 'Instrument',
    properties: instrumentProperties
  }
};

class LocationEdit extends React.Component {
  componentDidMount () {
    const { match: { params: { id } } } = this.props;

    if (!this.props.location || this.props.location.id || this.props.location.id !== id) {
      this.props.getMetadata(id);
    }
  }

  propUpdate (key, value) {
    const metadata = Object.assign({ instruments: [] }, this.props.location.metadata);
    const data = keypath.set(metadata, key, value);
    this.props.updateMetadata(data);
  }

  renderInfo () {
    const { location } = this.props;
    const { metadata } = location;
    return (
      <div className='flex edit-container justify-between'>
        <div className='location-edit-details'>
          <h1 className='page__title'>
            Location ID
            <span className='location-id'>{location.id}</span>
          </h1>
          <ul className='location-detail-list'>
            {/* TODO: make sure location, city, country exist */}
            <li>Location: <b>{location.location}</b></li>
            <li>City: <b>{location.city}</b></li>
            <li>Country: <b>{location.country}</b></li>
            {metadata && metadata.coordinates && metadata.coordinates.latitude && (<li>Latitude: <b>{metadata.coordinates.latitude}</b></li>)}
            {metadata && metadata.coordinates && metadata.coordinates.longitude && <li>Longitude: <b>{metadata.coordinates.longitude}</b></li>}
            {metadata && metadata.siteType && <li>Location Type: <b>{metadata.siteType}</b></li>}
          </ul>
        </div>

        {
          metadata &&
          metadata.coordinates &&
          metadata.coordinates.latitude &&
          metadata.coordinates.longitude && (
            <Map
              zoom={10}
              width={300}
              coordinates={{
                lat: metadata.coordinates.latitude,
                lon: metadata.coordinates.longitude
              }}
            />
          )
        }
      </div>
    );
  }

  renderStringProp (key, value, prop) {
    const onChange = (e) => {
      this.propUpdate(key, e.target.value);
    };

    return (
      <React.Fragment key={`form-field-${key}`}>
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

  renderIntegerProp (key, value, prop) {
    const onChange = (e) => {
      this.propUpdate(key, e.target.value);
    };

    return (
      <React.Fragment key={`form-field-${key}`}>
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

  renderBooleanProp (key, value, prop) {
    const onChange = (e) => {
      this.propUpdate(key, e.target.checked);
    };

    return (
      <React.Fragment key={`form-field-${key}`}>
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

  renderSelectProp (key, value, prop) {
    const availableValues = prop.enum;

    let options;
    if (availableValues) {
      options = availableValues.map((k) => ({ key: k, label: k }));
    }

    const onChange = (val) => {
      this.propUpdate(key, val.key);
    };

    return (
      <React.Fragment key={`form-field-${key}`}>
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

  renderMultiSelectProp (key, value, prop) {
    const availableValues = prop.items.enum;

    let options;
    if (availableValues) {
      options = availableValues.map((k) => ({ key: k, label: k }));
    }

    const onChange = (value) => {
      this.propUpdate(key, value.map((val) => val.key));
    };

    let values;
    if (value) {
      values = value.map((val) => ({ key: val, label: val }));
    }

    return (
      <React.Fragment key={`form-field-${key}`}>
        <label className='form__label'>{prop.title}</label>
        <Select
          isMulti
          value={values}
          options={options}
          onChange={onChange}
          getOptionValue={(option) => {
            return option.key;
          }}
        />
      </React.Fragment>
    );
  }

  renderDateProp (key, value, prop) {
    const onChange = (val) => {
      this.propUpdate(key, val);
    };

    const date = value ? parse(value) : '';

    return (
      <React.Fragment key={`form-field-${key}`}>
        <label className='form__label'>{prop.title}</label>
        <DatePicker
          className='form__control'
          selected={date}
          onChange={onChange}
        />
      </React.Fragment>
    );
  }

  renderEditSection (section, keyPrefix) {
    const { location } = this.props;
    const { metadata } = location;

    return (
      <div className='edit-box' key={`edit-section-${section.name}`}>
        <div className='edit-box-toggle'>
          {section.name}
        </div>
        <div className='edit-box-content'>
          {
            section.properties.map((prop) => {
              const key = keyPrefix ? `${keyPrefix}.${prop.key}` : prop.key;
              const value = keypath.get(metadata || {}, key);

              switch (prop.type) {
                case 'string':
                  if (prop.format && prop.format === 'date-time') {
                    return this.renderDateProp(key, value, prop);
                  } else if (prop.enum) {
                    return this.renderSelectProp(key, value, prop);
                  } else {
                    return this.renderStringProp(key, value, prop);
                  }
                case 'integer':
                  return this.renderIntegerProp(key, value, prop);
                case 'array':
                  return this.renderMultiSelectProp(key, value, prop);
                case 'boolean':
                  return this.renderBooleanProp(key, value, prop);
              }
            })
          }
        </div>
      </div>
    );
  }

  renderEditInstruments () {
    const { location } = this.props;

    let instruments;
    if (location.metadata) {
      instruments = keypath.get(location, 'metadata.instruments') || [];
    } else {
      instruments = [];
    }

    if (!instruments.length) {
      instruments.push({});
    }

    return instruments.map((instrument, i) => {
      const section = Object.assign({}, editorGroups.instrument, {
        name: `Instrument ${i + 1}`
      });

      return this.renderEditSection(section, `instruments.${i}`);
    });
  }

  renderMetadataForm () {
    const { location } = this.props;
    if (!location) return null;

    return (
      <main role='main'>
        {this.renderInfo()}

        <div className='inner-edit'>
          {this.renderEditSection(editorGroups.siteDetails)}
          {this.renderEditSection(editorGroups.maintenance)}

          <h2 className='location-view-header'>
            Instruments
          </h2>
          {
            this.renderEditInstruments()
          }

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
    const { location } = this.props;
    location.metadata.instruments.push({});
    this.props.updateMetadata(location.metadata);
  }

  onSaveLocationClick () {
    const { match } = this.props;
    const metadata = Object.assign({}, this.props.location.metadata);
    this.props.putMetadata(match.params.id, metadata).then(() => {
      this.props.history.push(`/location/${match.params.id}`);
    });
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
  const { location } = state.locations;
  return { location };
};

const mapDispatchToProps = {
  getMetadata,
  putMetadata,
  updateMetadata
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationEdit);

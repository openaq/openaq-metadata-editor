import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import keypath from 'obj-keypath';
import DatePicker from 'react-datepicker';
import parse from 'date-fns/parse';

import { schemas, validate } from 'openaq-data-format';

import Header from '../components/header';
import Map from '../components/map';
import ErrorMessage from '../components/error-message';
import FormInput from '../components/form/form-input';
import Asterisk from '../components/form/asterisk';

import { getMetadata, putMetadata, updateMetadata, setFormErrors } from '../state/locations/actions';

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
    if (locationSchema.required.includes(key)) {
      prop.required = true;
    }
    prop.key = key;
    return prop;
  });

const instrumentProperties = Object.keys(locationSchema.properties.instruments.items.properties)
  .map((key) => {
    const prop = locationSchema.properties.instruments.items.properties[key];
    if (locationSchema.properties.instruments.items.required.includes(key)) {
      prop.required = true;
    }
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
  constructor (props) {
    super(props);
    this.state = {
      errors: { instruments: [] },
      isUpdateError: false,
      errorMessage: ''
    };
  }

  componentDidMount () {
    const { match: { params: { id } } } = this.props;

    if (!this.props.location || this.props.location.id || this.props.location.id !== id) {
      this.props.getMetadata(id);
    }
  }

  /**
   * @param {string} key - form input label.
   * @param {number} value - form input value.
   * @return {function} action to update metadata object with type.
   */
  propUpdate (key, value) {
    const metadata = Object.assign({ instruments: [] }, this.props.location.metadata);
    const data = keypath.set(metadata, key, value);
    this.props.updateMetadata(data);
  }

  /**
   * @return Displays the form header with data from the provider that is not subject to change by the user.
   */
  renderInfo () {
    const { location } = this.props;

    return (
      <div className='location-info'>
        <h1 className='page__title'>
          Location ID
          <span className='location-id'>{location.id}</span>
        </h1>
        <ul className='location-detail-list'>
          {/* TODO: make sure location, city, country exist */}
          <li>Location: <b>{location.location}</b></li>
          <li>City: <b>{location.city}</b></li>
          <li>Country: <b>{location.country}</b></li>
          {location && location.coordinates && location.coordinates.latitude && (<li>Latitude: <b>{location.coordinates.latitude}</b></li>)}
          {location && location.coordinates && location.coordinates.longitude && <li>Longitude: <b>{location.coordinates.longitude}</b></li>}
        </ul>
        <div className='location-tooltip'>
          <i className='location-tooltip-button edit-box-delete collecticons collecticons-circle-information'/>
          <span className='location-tooltip-info'>This data is determined by the provider. Requests for changes may be made below using the notes field and the coordinate error checkbox.</span>
        </div>
      </div>
    );
  }

  /**
   * @param {string} key - form input label.
   * @param {number} value - form input value.
   * @param {object} prop - section properties used to populate dropdown.
   */
  renderSelectProp (key, value, prop) {
    const { required, title, description } = prop;
    const availableValues = prop.enum;

    let options;
    if (availableValues) {
      options = availableValues.map((k) => ({ key: k, label: k }));

      // Adds an option for users to deselect item
      const deselectValue = { key: '', label: 'Select One' };
      options.unshift(deselectValue);
    }

    const onChange = (val) => {
      this.propUpdate(key, val.key);
    };

    return (
      <React.Fragment>
        <label className='form__label'>
          {title}
          <Asterisk required={required}/>
        </label>
        <div className='tooltip-container'>
          <Select
            className='form__select'
            value={{ key: value, label: value }}
            options={options}
            onChange={onChange}
            getOptionValue={(option) => {
              return option.key;
            }}
          />
          <div className='tooltip'>
            <i className='tooltip-button edit-box-delete collecticons collecticons-circle-information'/>
            <span className='tooltip-info'>{description}</span>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderMultiSelectProp (key, value, prop) {
    const { required, title, description } = prop;
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
        <label className='form__label'>
          {title}
          <Asterisk required={required}/>
        </label>
        <div className='tooltip-container'>
          <Select
            isMulti
            className='form__select'
            value={values}
            options={options}
            onChange={onChange}
            getOptionValue={(option) => {
              return option.key;
            }}
          />
          <div className='tooltip'>
            <i className='tooltip-button edit-box-delete collecticons collecticons-circle-information'/>
            <span className='tooltip-info'>{description}</span>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderDateProp (key, value, prop) {
    const { required, title, description } = prop;
    const onChange = (val) => {
      this.propUpdate(key, val.toISOString());
    };

    const date = value ? parse(value) : '';

    return (
      <React.Fragment key={`form-field-${key}`}>
        <label className='form__label'>
          {title}
          <Asterisk required={required}/>
        </label>
        <div className='tooltip-container form__date'>
          <DatePicker
            className='form__control'
            selected={date}
            onChange={onChange}
          />
          <div className='tooltip'>
            <i className='tooltip-button edit-box-delete collecticons collecticons-circle-information'/>
            <span className='tooltip-info'>{description}</span>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderPropInput (key, value, prop) {
    switch (prop.type) {
      case 'string':
        if (prop.format && prop.format === 'date-time') {
          return this.renderDateProp(key, value, prop);
        } else if (prop.enum) {
          return this.renderSelectProp(key, value, prop);
        } else {
          return (
            <FormInput
              onChange= {(e) => { this.propUpdate(key, e.target.value); }}
              title={prop.title}
              value={value}
              description={prop.description}
              required={prop.required}
              type='text'
              isTooltopShowing={true}
            />);
        }
      case 'integer':
        return (
          <FormInput
            onChange= {(e) => { this.propUpdate(key, e.target.value ? Number(e.target.value) : null); }}
            title={prop.title}
            value={value}
            description={prop.description}
            required={prop.required}
            type='number'
            isTooltopShowing={true}
          />);
      case 'array':
        return this.renderMultiSelectProp(key, value, prop);
      case 'boolean':
        return (
          <FormInput
            onChange= {(e) => { this.propUpdate(key, e.target.checked); }}
            title={prop.title}
            value={value}
            description={prop.description}
            required={prop.required}
            type='checkbox'
            isTooltopShowing={false}
          />
        );
    }
  }

  renderEditSection (section, keyPrefix, options = { deletable: false }) {
    const { location } = this.props;
    const { metadata } = location;
    const { deletable, index } = options;

    return (
      <div className='edit-box' key={`edit-section-${section.name}`}>
        <div className='edit-box-toggle'>
          {section.name}
          {
            deletable && (
              <span
                className='edit-box-delete collecticons collecticons-trash-bin'
                onClick={() => {
                  this.onRemoveInstrumentClick(index);
                }}
              >
              </span>
            )
          }
        </div>
        <div className='edit-box-content'>
          {
            section.properties.map((prop) => {
              const key = keyPrefix ? `${keyPrefix}.${prop.key}` : prop.key;
              const value = keypath.get(metadata || {}, key);
              const error = keypath.get(this.props.errors, key);

              return (
                <div key={`form-field-${key}`} className={`form-field${error ? ' error' : ''}`}>
                  {this.renderPropInput(key, value, prop)}
                  {
                    error && (<ErrorMessage style='error-message' message={error.message}/>)
                  }
                </div>
              );
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
      instruments.push({
        type: '',
        serialNumber: '',
        parameters: []
      });
    }

    return instruments.map((instrument, i) => {
      const section = Object.assign({}, editorGroups.instrument, {
        name: `Instrument ${i + 1}`
      });

      const options = i > 0
        ? { deletable: true, index: i }
        : { deletable: false };

      return this.renderEditSection(section, `instruments.${i}`, options);
    });
  }

  /**
   * @return {class} Displays class component non-editable map with coordinates from metadata.
   */
  renderMap () {
    const { location } = this.props;

    const hasCoordinates = location &&
      location.coordinates &&
      location.coordinates.latitude &&
      location.coordinates.longitude;

    const coordinates = hasCoordinates
      ? [location.coordinates.longitude, location.coordinates.latitude]
      : [0, 0];

    return (
      <Map
        zoom={10}
        width={300}
        coordinates={coordinates}
      />
    );
  }

  renderMetadataForm () {
    const { location, errorCount } = this.props;
    if (!location) return null;

    return (
      <main role='main'>
        <div className='edit-container'>
          <div className='location-details flex justify-between'>
            {this.renderInfo()}
            {this.renderMap()}
          </div>
        </div>

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
          {(errorCount > 0) && (<ErrorMessage style='form-error-message' message='Please fix errors in the form above'/>)}
          {this.state.isUpdateError ? (
            <ErrorMessage
              style='form-error-message'
              message={this.state.errorMessage}
              retry={(e) => this.onSaveLocationClick(e)}
            />
          ) : null}
        </div>
      </main>
    );
  }

  onAddInstrumentClick () {
    const { location } = this.props;
    location.metadata.instruments.push({
      type: '',
      serialNumber: '',
      parameters: []
    });
    this.props.updateMetadata(location.metadata);
  }

  onRemoveInstrumentClick (index) {
    const { location } = this.props;
    location.metadata.instruments = location.metadata.instruments.filter((instr, i) => {
      return i !== index;
    });
    this.props.updateMetadata(location.metadata);
  }

  formatKey (key) {
    return key
      .replace('instance.', '')
      .replace('[', '.')
      .replace(']', '');
  }

  /**
   * @param {object} metadata - updated data from form input to be validated.
   * Sets metadata id.
   * Removes empty values that are not required.
   * Runs validation from open-aq-format.
   * Sets error state and message if triggered from validation.
   */
  validateForm (metadata) {
    const { match } = this.props;
    if (!metadata.id) metadata.id = match.params.id;
    // In the future, this should be replaced in favor of validation that accepts '' as a valid no-option.
    const isNotRequired = (key) => {
      const requiredKeys = ['id', 'instrument', 'name'];
      return requiredKeys.filter(requiredKey => (requiredKey === key));
    };
    Object.keys(metadata).forEach((key) => (metadata[key] === '' && !isNotRequired(key).length) && delete metadata[key]);
    const { errors } = validate('location', metadata);
    const errorState = { instruments: [] };

    if (errors && errors.length) {
      errors.forEach((error) => {
        const key = this.formatKey(error.property);
        error.key = key;
        keypath.set(errorState, key, error);
      });

      this.props.setFormErrors(errorState, errors.length);
      return false;
    }

    this.props.setFormErrors(errorState, errors.length);
    return true;
  }

  onSaveLocationClick () {
    const { match } = this.props;
    const metadata = Object.assign({}, this.props.location.metadata);

    if (this.validateForm(metadata)) {
      delete metadata.id;
      this.props.putMetadata(match.params.id, metadata)
        .then(() => {
          this.props.putError ? (
            this.setState({ isUpdateError: true, errorMessage: this.props.putErrorMessage })
          ) : (
            this.props.history.push(`/location/${match.params.id}`)
          );
        });
    }
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
  const { location, errors, errorCount, putError, putErrorMessage } = state.locations;
  return { location, errors, errorCount, putError, putErrorMessage };
};

const mapDispatchToProps = {
  getMetadata,
  putMetadata,
  updateMetadata,
  setFormErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationEdit);

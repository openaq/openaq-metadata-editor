import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { schemas } from 'openaq-data-format';
import format from 'date-fns/format';

import Header from '../components/header';
import Map from '../components/map';
import { getMetadata } from '../state/locations/actions';

const locationSchema = schemas.location;

const excludePropertiesFromViewing = [
  'id',
  'coordinates',
  'city',
  'country',
  'instruments',
  'parameters',
  'attribution'
];

const propertiesToView = Object.keys(locationSchema.properties)
  .filter((key) => !excludePropertiesFromViewing.includes(key))
  .map((key) => {
    const prop = locationSchema.properties[key];
    prop.key = key;
    return prop;
  });

const instrumentPropertiesToView = Object.keys(locationSchema.properties.instruments.items.properties)
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

const propertyGroups = {
  siteDetails: {
    name: 'Site Details',
    properties: propertiesToView.filter((prop) => !maintenanceProperties.includes(prop.key))
  },
  maintenance: {
    name: 'Maintenance',
    properties: propertiesToView.filter((prop) => maintenanceProperties.includes(prop.key))
  },
  instrument: {
    name: 'Instrument',
    properties: instrumentPropertiesToView
  }
};

class LocationView extends React.Component {
  componentDidMount () {
    const { match: { params: { id } } } = this.props;

    if (!this.props.location.id) {
      this.props.getMetadata(id);
    }

    this._renderList = this._renderList.bind(this);
    this.renderSiteDetails = this.renderSiteDetails.bind(this);
    this.renderMaintenance = this.renderMaintenance.bind(this);
    this.renderInstrument = this.renderInstrument.bind(this);
  }

  _renderList (keyPrefix, metadata, properties) {
    let props = [];

    properties
      .filter(prop => {
        return typeof (metadata[prop.key]) !== 'undefined';
      })
      .forEach(prop => {
        props.push(<dt key={`${keyPrefix}-${prop.title}`}>{`${prop.title}`}</dt>);
        let val = metadata[prop.key];
        if (prop.format && prop.format === 'date-time') {
          val = format(val, 'YYYY-MM-DD');
        }
        if (prop.type && prop.type === 'boolean') {
          val = val ? 'Yes' : 'No';
        }
        props.push(<dd key={`${keyPrefix}-${prop.title}-val`}>{val}</dd>);
      });
    return (
      <dl>
        {props}
      </dl>
    );
  }

  renderSiteDetails (metadata) {
    return this._renderList('siteDetails', metadata, propertyGroups.siteDetails.properties);
  }

  renderMaintenance (metadata) {
    return this._renderList('metadata', metadata, propertyGroups.maintenance.properties);
  }

  renderInstrument (instr, i) {
    const props = this._renderList(`instrument-${i}`, instr, propertyGroups.instrument.properties);
    return (
      <div className='column' key={`instrument-${i}`}>
        <h3 className=''>
          Instrument {i}
        </h3>
        <dl>
          {props}
        </dl>
      </div>
    );
  }

  render () {
    const { location, match } = this.props;
    if (!location) return null;

    const { metadata } = location;

    if (!metadata) {
      return (
        <div className='page page--location-view'>
          <Header>
            <h1 className='page__title'>
              <span className='location-id'>{location.id}</span>
              <span className='location-name'>{location.location}</span>
              <span className='location-city'>{location.city}, {location.country}</span>
            </h1>
          </Header>

          <main role='main'>
            <div className='callout-button'>
              <Link to={`/location/${match.params.id}/edit`}>
                This location does not have any metadata. Edit this location.
              </Link>
            </div>
            <div className='inner'>
              <div className='row'>
                <ul className='location-detail-list' style={{ marginBottom: 100 }}>
                  <li>Location: <b>{location.location}</b></li>
                  <li>City: <b>{location.city}</b></li>
                  <li>Country: <b>{location.country}</b></li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      );
    }

    return (
      <div className='page page--location-view'>
        <Header>
          <h1 className='page__title'>
            <span className='location-id'>{metadata.locationId}</span>
            <span className='location-name'>{location.location}</span>
            <span className='location-city'>{location.city}, {location.country}</span>
          </h1>
        </Header>

        <main role='main'>
          <div className='inner'>
            <div className='row'>
              <ul className='location-detail-list'>
                <li>Location: <b>{location.location}</b></li>
                <li>City: <b>{location.city}</b></li>
                <li>Country: <b>{location.country}</b></li>
                {metadata && metadata.coordinates && metadata.coordinates.latitude && (<li>Latitude: <b>{metadata.coordinates.latitude}</b></li>)}
                {metadata && metadata.coordinates && metadata.coordinates.longitude && <li>Longitude: <b>{metadata.coordinates.longitude}</b></li>}
                {metadata && metadata.siteType && <li>Location Type: <b>{metadata.siteType}</b></li>}
              </ul>

              {
                metadata &&
                metadata.coordinates &&
                metadata.coordinates.latitude &&
                metadata.coordinates.longitude && (
                  <Map
                    zoom={10}
                    width={300}
                    coordinates={[metadata.coordinates.longitude, metadata.coordinates.latitude]}
                  />
                )
              }
            </div>

            <div className='location-view-section'>
              <h2 className='location-view-header'>
                Site Details
              </h2>
              {this.renderSiteDetails(metadata)}
            </div>

            <div className='location-view-section'>
              <h2 className='location-view-header'>
                Maintenance
              </h2>
              {this.renderMaintenance(metadata)}
            </div>

            <div className='location-view-section'>
              <h2 className='location-view-header'>
                Instruments
              </h2>
              <div className='flex'>
                {metadata.instruments.map(this.renderInstrument)}
              </div>
            </div>
          </div>
          <div className='callout-button'>
            <Link to={`/location/${match.params.id}/edit`}>
              See something missing? Edit this location
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.locations.location
  };
};

const mapDispatchToProps = {
  getMetadata
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationView);

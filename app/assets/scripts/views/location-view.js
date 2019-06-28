import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { schemas } from 'openaq-data-format';

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
  }

  renderSiteDetails (metadata) {
    let props = [];
    propertyGroups.siteDetails.properties
      .filter(prop => {
        return typeof (metadata[prop.key]) !== 'undefined';
      })
      .forEach(prop => {
        props.push(<dt>{`${prop.title}`}</dt>);
        props.push(<dd>{metadata[prop.key]}</dd>);
      });
    return (
      <dl>
        {props}
      </dl>
    );
  }

  renderMaintenance (metadata) {
    let props = [];
    propertyGroups.maintenance.properties
      .filter(prop => {
        return typeof (metadata[prop.key]) !== 'undefined';
      })
      .forEach(prop => {
        props.push(<dt>{`${prop.title}`}</dt>);
        props.push(<dd>{metadata[prop.key]}</dd>);
      });
    return (
      <dl>
        {props}
      </dl>
    );
  }

  renderInstrument (instr, i) {
    let props = [];
    propertyGroups.instrument.properties
      .filter(prop => {
        return typeof (instr[prop.key]) !== 'undefined';
      })
      .forEach(prop => {
        props.push(<dt>{`${prop.title}`}</dt>);
        props.push(<dd>{instr[prop.key]}</dd>);
      });
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

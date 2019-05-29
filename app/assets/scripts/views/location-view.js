import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../components/header';
import Map from '../components/map';

class LocationView extends React.Component {
  render () {
    const { match } = this.props;

    return (
      <div className='page page--location-view'>
        <Header>
          <h1 className='page__title'>
            <span className='location-id'>9203184789012m34</span>
            <span className='location-name'>Seattle-10th & Welle</span>
            <span className='location-city'>Seattle, United States</span>
          </h1>

        </Header>
        <main role='main'>
          <div className='inner'>
            <div className='row'>
              <ul className='location-detail-list'>
                <li>Location: <b>{`Seattle-10th & Welle`}</b></li>
                <li>City: <b>{`Seattle`}</b></li>
                <li>Country: <b>{`United States`}</b></li>
                <li>Latitude: <b>{`47.597`}</b></li>
                <li>Longitude: <b>{`-122.32`}</b></li>
                <li>Location Type: <b>{`Urban`}</b></li>
              </ul>

              <Map zoom={10} coordinates={{ lat: 47.597, lon: -122.32 }} />
            </div>

            <div className='location-view-section'>
              <h2 className='location-view-header'>
                Site Details
              </h2>
              <dl>
                <dt>Elevation</dt>
                <dd>432m</dd>
                <dt>Site type</dt>
                <dd>Urban</dd>
                <dt>Description</dt>
                <dd>Text describing the location.</dd>
              </dl>
            </div>

            <div className='location-view-section'>
              <h2 className='location-view-header'>
                Maintenance
              </h2>
              <dl>
                <dt>Installation Date</dt>
                <dd>2016/03/15</dd>
                <dt>Last Maintenance Date</dt>
                <dd>2019/05/28</dd>
                <dt>Maintenance Schedule</dt>
                <dd>As needed</dd>
              </dl>
            </div>

            <div className='location-view-section'>
              <h2 className='location-view-header'>
                Instruments
              </h2>
              <div className='flex'>
                <div className='column'>
                  <h3 className=''>
                    Instrument 1
                  </h3>
                  <dl>
                    <dt>Pollutants</dt>
                    <dd><b>CO, PM2.5</b></dd>
                    <dt>Model</dt>
                    <dd>Spectrometer 1.109</dd>
                    <dt>Manufacturer</dt>
                    <dd>GRIMM</dd>
                    <dt>Installed</dt>
                    <dd>2016</dd>
                  </dl>
                </div>
                <div className='column'>
                  <h3 className=''>
                    Instrument 2
                  </h3>
                  <dl>
                    <dt>Pollutants</dt>
                    <dd><b>CO, PM2.5</b></dd>
                    <dt>Model</dt>
                    <dd>Spectrometer 1.109</dd>
                    <dt>Manufacturer</dt>
                    <dd>GRIMM</dd>
                    <dt>Installed</dt>
                    <dd>2016</dd>
                  </dl>
                </div>
              </div>
            </div>

          </div>
          <div className='callout-button'>
            <Link to={`/location/edit/${match.params.id}`}>
              See something missing? Edit this location
            </Link>
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

import React from 'react';
import { Link } from 'react-router-dom';

class Table extends React.Component {
  renderLocations (locations) {
    if (!locations || !locations.length) {
      return null;
    }

    return (
      <tbody>
        {
          locations.map((location, i) => this.renderLocation(location, i))
        }
      </tbody>
    );
  }

  renderLocation (location, index) {
    const { metadata } = location;
    const locationUrl = `/location/${location.id}`;

    return (
      <tr key={`location-table-row-${index}`}>
        <td>
          <Link to={locationUrl}>
            {location.id}
          </Link>
        </td>
        <td>
          <Link to={locationUrl}>
            {location.country}
          </Link>
        </td>
        <td>
          <Link to={locationUrl}>
            {location.city}
          </Link>
        </td>
        <td>
          <Link to={locationUrl}>
            {location.activationDate}
          </Link>
        </td>
        <td>
          <Link to={locationUrl}>
            {metadata && metadata.siteType}
          </Link>
        </td>
        <td>
          <Link to={locationUrl}>
            {metadata && metadata.instruments.length}
          </Link>
        </td>
        <td>
          <Link to={locationUrl}>
            {metadata && metadata.elevation}
          </Link>
        </td>
      </tr>
    );
  }

  render () {
    const { locations } = this.props;

    return (
      <div className='responsive-table-wrapper'>
        <table className='table table--zebra table-with-link-rows'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Country</th>
              <th>City</th>
              <th>Activated</th>
              <th>Site Type</th>
              <th>Instruments</th>
              <th>Elevation (m)</th>
            </tr>
          </thead>
          { this.renderLocations(locations) }
        </table>
      </div>
    );
  }
}

export default Table;

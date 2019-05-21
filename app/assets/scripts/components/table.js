import React from 'react';
import { Link } from 'react-router-dom';

class Table extends React.Component {
  renderLocations (locations) {
    return (
      <tbody>
        {
          locations.map((location, i) => this.renderLocation(location, i))
        }
      </tbody>
    );
  }

  renderLocation (location, index) {
    return (
      <tr key={`location-table-row-${index}`}>
        <td>
          <Link to={`/location/${location.id}`}>
            {location.id}
          </Link>
        </td>
        <td>
          {location.country}
        </td>
        <td>
          {location.city}
        </td>
        <td>
          {location.activationDate}
        </td>
        <td>
          {location.siteType}
        </td>
        <td>
          {location.instruments.length}
        </td>
        <td>
          {location.altitude}
        </td>
      </tr>
    );
  }

  render () {
    const { locations } = this.props;

    return (
      <section className='fold'>
        <div className='row'>
          <div className='responsive-table-wrapper'>
            <table className='table table--zebra'>
              <thead>
                <tr>
                  <th>Station ID</th>
                  <th>Country</th>
                  <th>City</th>
                  <th>Activated</th>
                  <th>Site Type</th>
                  <th>Instruments</th>
                  <th>Altitude (m)</th>
                </tr>
              </thead>
              { this.renderLocations(locations) }
            </table>
          </div>
        </div>
      </section>
    );
  }
}

export default Table;

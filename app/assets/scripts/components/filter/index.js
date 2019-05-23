import React from 'react';

import MultiCheckboxFilter from './multi-checkbox';
import DateFilter from './date';
import RangeFilter from './range';

const initialState = {
  open: false,
  filter: {
    countries: {},
    pollutants: {},
    siteType: {},
    stationHeight: null,
    completeness: null,
    installationDate: {
      start: null,
      end: null
    }
  }
};

const filterInputs = {
  countries: {
    name: 'Countries',
    Component: MultiCheckboxFilter
  },
  pollutants: {
    name: 'Pollutants',
    Component: MultiCheckboxFilter
  },
  siteType: {
    name: 'Site Type',
    Component: MultiCheckboxFilter
  },
  completeness: {
    name: 'Metadata Completeness',
    Component: RangeFilter
  },
  stationHeight: {
    name: 'Station height (m)',
    Component: RangeFilter
  },
  installationDate: {
    name: 'Installation Date',
    Component: DateFilter
  }
};

const formInputOptions = {
  countries: [],
  pollutants: ['pm25', 'pm10', 'co', 'bc', 'so2', 'no2', 'o3'],
  siteType: ['rural', 'urban', 'suburban', 'other'],
  sourceType: ['government', 'research', 'other'],
  stationHeight: {
    start: 0,
    end: 100000
  },
  installationDate: {
    start: null,
    end: null
  }
};

class Filter extends React.Component {
  constructor (props) {
    super(props);
    const { locations } = props;
    console.log('locations', locations);
    const state = Object.assign({}, initialState);

    this.state = state;
  }

  reset () {
    this.setState(Object.assign({}, initialState));
  }

  resetFilter () {
    this.setState({ filter: Object.assign({}, initialState).filter });
  }

  toggle () {
    const { open } = this.state;

    if (open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  }

  setFilterValue (key, value) {
    const { filter } = this.state;
    filter[key] = value;
    this.setState({ filter });
  }

  renderToggle () {
    const { open } = this.state;

    const onClick = () => {
      this.toggle();
    };

    const direction = open ? 'down' : 'right';

    return (
      <div onClick={onClick}>
        <h2>
          Filter Locations
          <span
            className={`collecticons collecticons-chevron-${direction}--small`}
            style={{ marginLeft: 4, verticalAlign: 'top', display: 'inline-block' }}
          >
          </span>
        </h2>
      </div>
    );
  }

  renderInput (key) {
    const { Component, name } = filterInputs[key];
    const options = formInputOptions[key];
    const value = this.state.filter[key];
    const onChange = (value) => {
      this.setFilterValue(key, value);
    };

    return (
      <Component
        onChange={onChange}
        options={options}
        value={value}
        name={name}
      />
    );
  }

  renderInputs () {
    return (
      <div className='flex justify-between'>
        <div className='filter-column'>
          {this.renderInput('countries')}
        </div>
        <div className='filter-column'>
          {/* this.renderInput('completeness') */}
          {this.renderInput('installationDate')}
          {this.renderInput('stationHeight')}
        </div>
        <div className='filter-column'>
          {this.renderInput('pollutants')}
          {this.renderInput('siteType')}
        </div>
      </div>
    );
  }

  render () {
    const { open } = this.state;

    return (
      <section className='filter fold fold--filled'>
        <div className='row'>
          {this.renderToggle()}
          {/* open && */ this.renderInputs()}
        </div>
      </section>
    );
  }
}

export default Filter;

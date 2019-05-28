import React from 'react';
import alpha2Countries from 'alpha2-countries';
import subYears from 'date-fns/sub_years';

import MultiCheckboxFilter from './multi-checkbox';
import DateFilter from './date';
import RangeFilter from './range';
import SelectFilter from './select';

const countryList = alpha2Countries.getNameCodePairs().map((country) => {
  return {
    label: country.name,
    value: country.code
  };
});

const initialState = {
  open: false,
  filter: {
    countries: [],
    pollutants: {},
    siteType: {},
    elevation: {
      min: 0,
      max: 10000
    },
    completeness: null,
    installationDate: {
      start: subYears(new Date(), 10),
      end: new Date()
    }
  }
};

const filterInputs = {
  countries: {
    name: 'Countries',
    Component: SelectFilter
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
  elevation: {
    name: 'Elevation (m)',
    Component: RangeFilter
  },
  installationDate: {
    name: 'Installation Date',
    Component: DateFilter
  }
};

const formInputOptions = {
  countries: countryList,
  pollutants: ['pm25', 'pm10', 'co', 'bc', 'so2', 'no2', 'o3'],
  siteType: ['rural', 'urban', 'suburban', 'other'],
  sourceType: ['government', 'research', 'other'],
  elevation: {
    min: 0,
    max: 10000
  },
  installationDate: {
    start: subYears(new Date(), 10),
    end: new Date()
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
      <div className='filter-toggle' onClick={onClick}>
        <h2 style={{ marginBottom: 0 }}>
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
      <div className='filter-content flex justify-between'>
        <div className='filter-column'>
          {this.renderInput('countries')}
        </div>
        <div className='filter-column'>
          {/* this.renderInput('completeness') */}
          {this.renderInput('installationDate')}
          {this.renderInput('elevation')}
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
        <div className='inner'>
          {this.renderToggle()}
          {open && this.renderInputs()}
        </div>
      </section>
    );
  }
}

export default Filter;

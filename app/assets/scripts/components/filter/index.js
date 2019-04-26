import React from 'react';

import MultiCheckboxFilter from './multi-checkbox';
import DateFilter from './date';
import RangeFilter from './range';

const initialState = {
  open: false,
  filter: {
    countries: [],
    pollutants: [],
    siteType: [],
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

class Filter extends React.Component {
  constructor (props) {
    super(props);
    this.state = Object.assign({}, initialState);
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

    const direction = open ? 'down' : 'left';

    return (
      <div onClick={onClick}>
        <h2>
          Filter Locations
          <span className={`collecticons collecticons-magnifier-${direction}`}></span>
        </h2>
      </div>
    );
  }

  renderInput (key) {
    const { name, Component } = filterInputs[key];

    const onChange = (value) => {
      this.setFilterValue(key, value);
    };

    return (
      <Component onChange={onChange} />
    );
  }

  renderInputs () {
    return (
      <div>
        <div>
          {this.renderInput('countries')}
        </div>
        <div>
          {this.renderInput('completeness')}
          {this.renderInput('installationDate')}
          {this.renderInput('stationHeight')}
        </div>
        <div>
          {this.renderInput('pollutants')}
          {this.renderInput('siteType')}
        </div>
      </div>
    );
  }

  render () {
    const { open } = this.state;

    return (
      <div>
        {this.renderToggle()}
        {open && this.renderInputs()}
      </div>
    );
  }
}

export default Filter;

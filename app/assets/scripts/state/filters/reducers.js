import * as constants from './constants';
import subYears from 'date-fns/sub_years';

const initialState = {
  countries: [],
  pollutants: {},
  siteType: {},
  elevation: {
    min: 0,
    max: 10000
  },
  completeness: {
    min: 0,
    max: 100
  },
  installationDate: {
    start: subYears(new Date(), 10),
    end: new Date()
  }
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.RESET_FILTERS: {
      return initialState;
    }

    case constants.SET_FILTERS: {
      return Object.assign({}, state, action.data);
    }
  }

  return state;
}

export default reducer;

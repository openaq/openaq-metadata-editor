import * as constants from './constants';

export function resetFilters (params) {
  return {
    type: constants.RESET_FILTERS
  };
}

export function setFilters (data) {
  return {
    type: constants.SET_FILTERS,
    data
  };
}

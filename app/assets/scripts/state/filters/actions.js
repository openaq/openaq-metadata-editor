import * as constants from './constants';

export function resetFilters (params) {
  return {
    type: constants.RESET_FILTERS
  };
}

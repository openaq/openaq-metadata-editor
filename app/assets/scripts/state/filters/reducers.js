import * as constants from './constants';

const initialState = {
  countries: []
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.RESET_FILTERS: {
      return initialState;
    }
  }

  return state;
}

export default reducer;

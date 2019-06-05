import * as constants from './constants';

const initialState = {
  locationIndex: {},
  locations: {},
  metadatas: {},
  metadata: null
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.SET_LOCATION_INDEX: {
      state.locationIndex = action.data;
      return Object.assign({}, state);
    }

    case constants.LOADING_LOCATION_LIST: {
      state.locationList = [];
      return Object.assign({}, state);
    }

    case constants.LOADED_LOCATION_LIST: {
      state.locationList = action.data;
      return Object.assign({}, state);
    }

    case constants.LOADING_LOCATION_LIST_ERROR: {
      console.log('error', action.error);
      return state;
    }

    case constants.LOADING_METADATA_LIST: {
      state.metadataList = [];
      return Object.assign({}, state);
    }

    case constants.LOADED_METADATA_LIST: {
      state.metadataList = action.data;
      return Object.assign({}, state);
    }

    case constants.LOADING_METADATA_LIST_ERROR: {
      console.log('error', action.error);
      return state;
    }

    case constants.LOADING_METADATA: {
      state.metadata = null;
      return Object.assign({}, state);
    }

    case constants.LOADED_METADATA: {
      state.metadata = action.data;
      return Object.assign({}, state);
    }

    case constants.LOADING_METADATA_ERROR: {
      console.log('error', action.error);
      return state;
    }
  }

  return state;
}

export default reducer;

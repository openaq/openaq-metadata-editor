import * as constants from './constants';

const initialState = {
  metadataList: {},
  location: null
};

function reducer (state = initialState, action) {
  switch (action.type) {
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
      state.location = null;
      return Object.assign({}, state);
    }

    case constants.LOADED_METADATA: {
      state.location = action.data;
      return Object.assign({}, state);
    }

    case constants.LOADING_METADATA_ERROR: {
      console.log('error', action.error);
      return state;
    }

    case constants.PUT_METADATA_ERROR: {
      console.log('error', action.error);
      return state;
    }
  }

  return state;
}

export default reducer;

import * as constants from './constants';

const initialState = {
  metadataList: { results: [], meta: { found: 0 } },
  location: {
    metadata: { instruments: [] }
  },
  putError: '',
  putErrorMessage: '',
  errors: { instruments: [] },
  errorCount: 0
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.LOADING_METADATA_LIST: {
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
      console.error('PUT ERROR:', action.error);
      return Object.assign({}, state, {
        putError: action.error,
        putErrorMessage: 'There was an error updating metadata. Please try again.'
      });
    }

    case constants.UPDATE_METADATA: {
      const location = Object.assign({}, state.location);
      location.metadata = Object.assign({}, location.metadata, action.data);
      return Object.assign({}, state, { location });
    }

    case constants.SET_FORM_ERRORS: {
      return Object.assign({}, state, {
        errors: action.errors,
        errorCount: action.errorCount || 0
      });
    }
  }

  return state;
}

export default reducer;

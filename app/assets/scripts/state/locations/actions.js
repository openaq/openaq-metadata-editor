import * as constants from './constants';
import api from '../../services/openaq-api';

export function getMetadataList (params) {
  return (dispatch, getState) => {
    dispatch({ type: constants.LOADING_METADATA_LIST });
    const { filters } = getState();

    return api.getMetadataList(params, filters)
      .then(data => {
        dispatch({
          type: constants.LOADED_METADATA_LIST,
          data: data
        });
      })
      .catch(err => {
        dispatch({
          type: constants.LOADING_METADATA_LIST_ERROR,
          error: err
        });
      });
  };
}

export function getMetadata (id) {
  return (dispatch, getState) => {
    dispatch({ type: constants.LOADING_METADATA });

    return api.getMetadata(id)
      .then(data => {
        dispatch({
          type: constants.LOADED_METADATA,
          data: data.results
        });
        return data.results;
      })
      .catch(err => {
        dispatch({
          type: constants.LOADING_METADATA_ERROR,
          error: err
        });
      });
  };
}

export function putMetadata (id, obj) {
  return (dispatch, getState) => {
    return api.putMetadata(id, obj)
      .then(data => {
        dispatch({
          type: constants.PUT_METADATA,
          data
        });
      })
      .catch(err => {
        dispatch({
          type: constants.PUT_METADATA_ERROR,
          error: err
        });
      });
  };
}

export function updateMetadata (data) {
  return {
    type: constants.UPDATE_METADATA,
    data
  };
}

export function setFormErrors (errors, errorCount) {
  return {
    type: constants.SET_FORM_ERRORS,
    errors,
    errorCount
  };
}

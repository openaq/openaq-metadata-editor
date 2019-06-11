import * as constants from './constants';
import api from '../../services/openaq-api';
console.log('constants', constants);
export function getMetadataList (params) {
  return (dispatch, getState) => {
    dispatch({ type: constants.LOADING_METADATA_LIST });

    return api.getMetadataList(params)
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

    api.getMetadata(id)
      .then(data => {
        dispatch({
          type: constants.LOADED_METADATA,
          data: data
        });
      })
      .catch(err => {
        dispatch({
          type: constants.LOADING_METADATA_ERROR,
          error: err
        });
      });
  };
}

export function putMetadata (obj) {
  return (dispatch, getState) => {
    api.putMetadata(obj)
      .then(data => {
        dispatch({
          type: constants.PUT_METADATA,
          data: data
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

import * as constants from './constants';
import api from '../../services/openaq-api';

export function getLocationsAndMetadata (params) {
  return (dispatch, getState) => {
    dispatch({ type: constants.LOADING_LOCATION_LIST });
    dispatch({ type: constants.LOADING_METADATA_LIST });

    const locationRequest = api.getLocations(params)
      .catch(err => {
        dispatch({
          type: constants.LOADING_LOCATION_LIST_ERROR,
          error: err
        });
      });

    const metadataRequest = api.getMetadataList(params)
      .catch(err => {
        dispatch({
          type: constants.LOADING_METADATA_LIST_ERROR,
          error: err
        });
      });

    Promise.all([ locationRequest, metadataRequest ]).then(([locationList, metadataList]) => {
      dispatch({
        type: constants.LOADED_LOCATION_LIST,
        data: locationList
      });

      dispatch({
        type: constants.LOADED_METADATA_LIST,
        data: metadataList
      });

      const locationIndex = {};

      locationList.results.reduce((obj, location) => {
        if (!obj[location.id]) obj[location.id] = {};
        obj[location.id].location = location;
        return obj;
      }, locationIndex);

      metadataList.results.reduce((obj, metadata) => {
        if (!obj[metadata.locationId]) obj[metadata.locationId] = {};
        obj[metadata.locationId].metadata = metadata;
        return obj;
      }, locationIndex);

      dispatch({
        type: constants.SET_LOCATION_INDEX,
        data: locationIndex
      });
    });
  };
}

export function getLocationList (params) {
  return (dispatch, getState) => {
    dispatch({ type: constants.LOADING_LOCATION_LIST });

    return api.getLocations(params)
      .then(data => {
        dispatch({
          type: constants.LOADED_LOCATION_LIST,
          data: data
        });
      })
      .catch(err => {
        dispatch({
          type: constants.LOADING_LOCATION_LIST_ERROR,
          error: err
        });
      });
  };
}

export function getMetadataList (params) {
  return (dispatch, getState) => {
    dispatch({ type: constants.LOADING_METADATA_LIST });

    return api.getMetadataList(params)
      .then(data => {
        dispatch({
          type: constants.LOADED_METADATALIST,
          data: data
        });
      })
      .catch(err => {
        dispatch({
          type: constants.LOADING_METADATALIST_ERROR,
          error: err
        });
      });
  };
}

export function getMetadata (id) {
  return (dispatch, getState) => {
    dispatch({ type: constants.LOADING_METADATA_LIST });

    api.getMetadata(id)
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

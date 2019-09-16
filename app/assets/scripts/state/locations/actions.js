import * as constants from './constants';
import api from '../../services/openaq-api';

/**
 * Takes the state filters from the store
 * and adds them to the params object
 * @param {Object} params
 * @param {Object} filters
 * @returns {Object}
 */
function _addFiltersToParams (params, filters) {
  let { countries, completeness, elevation, pollutants, siteType } = filters;

  /** countries */
  params['country'] = countries.map(c => c.value);

  /** installation dates */
  // Temporarily remove activation date
  // params['activationDate'] = `["${new Date(installationDate.start)}","${new Date(installationDate.end)}"]`;

  /** elevation */
  params['inletHeight'] = `["${elevation.min}", "${elevation.max}"]`;

  /** pollutants */
  params['parameter'] = Object.keys(pollutants).filter(key => pollutants[key]);

  /** Site type */
  params['siteType'] = Object.keys(siteType).filter(key => siteType[key]);

  /** Completeness */
  params['completeness'] = `["${completeness.min}","${completeness.max}"]`;

  return params;
}

export function getMetadataList (params) {
  return (dispatch, getState) => {
    dispatch({ type: constants.LOADING_METADATA_LIST });
    const { filters } = getState();

    return api.getMetadataList(_addFiltersToParams(params, filters))
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
        throw new Error()
        dispatch({
          type: constants.PUT_METADATA,
          data
        });
      })
      .catch(err => {
        console.log('error firing')
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

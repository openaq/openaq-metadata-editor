import * as constants from './constants';

const initialState = {
  accessToken: null,
  idToken: null,
  userProfile: null,
  expiresAt: null
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN_USER: {
      return action.data;
    }

    case constants.LOGOUT_USER: {
      return initialState;
    }
  }
  return state;
}

export default reducer;

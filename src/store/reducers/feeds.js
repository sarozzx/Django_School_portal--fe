import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  feeds: [],
  error: null,
  loading: false
};

const getFeedStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getFeedSuccess = (state, action) => {
  return updateObject(state, {
    feeds: action.feeds,
    error: null,
    loading: false
  });
};

const getFeedFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};


const createFeedStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createFeedSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createFeedFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FEED_START:
      return getFeedStart(state, action);
    case actionTypes.GET_FEED_SUCCESS:
      return getFeedSuccess(state, action);
    case actionTypes.GET_FEED_FAIL:
      return getFeedFail(state, action);

    case actionTypes.CREATE_FEED_START:
      return createFeedStart(state, action);
    case actionTypes.CREATE_FEED_SUCCESS:
      return createFeedSuccess(state, action);
    case actionTypes.CREATE_FEED_FAIL:
      return createFeedFail(state, action);
    default:
      return state;
  }
};

export default reducer;

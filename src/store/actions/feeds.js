import axios from "axios";
import * as actionTypes from "./actionTypes";

const getFeedStart = () => {
  return {
    type: actionTypes.GET_FEED_START
  };
};

const getFeedSuccess = feeds => {
  return {
    type: actionTypes.GET_FEED_SUCCESS,
    feeds
  };
};

const getFeedFail = error => {
  return {
    type: actionTypes.GET_FEED_FAIL,
    error: error
  };
};

export const getFeeds = token => {
  return dispatch => {
    dispatch(getFeedStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get("https://class-ro-om.herokuapp.com/application/feed")
      .then(res => {
        const feeds = res.data;
        console.log(feeds)
        dispatch(getFeedSuccess(feeds));
      })
      .catch(err => {
        dispatch(getFeedFail());
      });
  };
};

const createFeedStart = () => {
  return {
    type: actionTypes.CREATE_FEED_START
  };
};

const createFeedSuccess = assignment => {
  return {
    type: actionTypes.CREATE_FEED_SUCCESS,
    assignment
  };
};

const createFeedFail = error => {
  return {
    type: actionTypes.CREATE_FEED_FAIL,
    error: error
  };
};

export const createFeeds = (token, data) => {
  return dispatch => {
    dispatch(createFeedStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    console.log(data)
    axios
      .post(`https://class-ro-om.herokuapp.com/application/feed/`, data)
      .then(res => {

        dispatch(createFeedSuccess());
      })
      .catch(err => {
        dispatch(createFeedFail());
      });
  };
};
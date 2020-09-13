import axios from "axios";
import * as actionTypes from "./actionTypes";

const getGASNTListStart = () => {
  return {
    type: actionTypes.GET_G_ASSIGNMENT_LIST_START
  };
};

const getGASNTListSuccess = assignments => {
  return {
    type: actionTypes.GET_G_ASSIGNMENTS_LIST_SUCCESS,
    assignments
  };
};

const getGASNTListFail = error => {
  return {
    type: actionTypes.GET_G_ASSIGNMENTS_LIST_FAIL,
    error: error
  };
};

export const getGASNTS = (username,token) => {
  return dispatch => {
    dispatch(getGASNTListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`https://class-ro-om.herokuapp.com/application/gassignment/?username=${username}`)
      .then(res => {
        const assignments = res.data;
        dispatch(getGASNTListSuccess(assignments));
      })
      .catch(err => {
        dispatch(getGASNTListFail());
      });
  };
};


export const getallGASNTS = (token) => {
  return dispatch => {
    dispatch(getGASNTListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`https://class-ro-om.herokuapp.com/application/gassignment/`)
      .then(res => {
        const assignments = res.data;
        dispatch(getGASNTListSuccess(assignments));
      })
      .catch(err => {
        dispatch(getGASNTListFail());
      });
  };
};


export const createGASNT = (token, asnt) => {
  return dispatch => {

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    console.log(asnt)
    axios
      .post(`https://class-ro-om.herokuapp.com/application/gassignment/create/`, asnt)
      .then(res => {
          console.log("success")

      })
      .catch(err => {

      });
  };
};
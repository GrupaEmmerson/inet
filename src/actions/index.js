import axios from 'axios';
import { browserHistory } from 'react-router';
import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE, GET_USERS, GET_OFFICE_WORK } from './types';

const ROOT_URL = 'http://api-inet-backend.local';

axios.interceptors.response.use(undefined, function (error) {

  return new Promise(function(resolve, reject){
    if(error.response.status == '401' && error.config){
      axios.post(`${ROOT_URL}/app_dev.php/oauth/v2/token`, {
          client_id: '1_a',
          client_secret: 'b',
          grant_type: 'refresh_token',
          refresh_token: localStorage.getItem('refresh_token')
      })
          .then(response => {
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);

            error.config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
            axios(error.config).then(resolve, reject);

          })
          .catch(() =>{
            browserHistory.push('/');
          });
    }

  });
});

export function getUsers() {
  return function (dispatch) {

    axios.get(`${ROOT_URL}/app_dev.php/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json'
          }
        })
        .then(response => {
          dispatch({type: GET_USERS, payload: response.data});
        })
        .catch(error => {
          browserHistory.push('/');
        });
  }
}

export function signinUser({email, password}){

  return function(dispatch){
    axios.post(`${ROOT_URL}/app_dev.php/oauth/v2/token`, {
        client_id: '1_a',
        client_secret: 'b',
        grant_type: 'password',
        username: email,
        password: password
    })
    .then(response => {
      dispatch({type: AUTH_USER});
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      browserHistory.push('/');
    })
    .catch(() =>{
      dispatch(authError('Bad Login Info'));
    });
  }

}

export function authError(error){
  return{
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser(){
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };

}

export function signupUser({email, password}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/app_dev.php/v1/create`, {"user":{"username": email, "password": password, "email": email+"@emmerson.pl"}})
    .then(response => {
      dispatch({type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/users');
    })
    .catch(function(error){
      dispatch(authError(error.response.data.error));
    });
  }
}

export function deleteUser({id}){
    return function(dispatch){

        axios.post(`${ROOT_URL}/app_dev.php/v1/delete`, {"id":id})
        .then(response => {
            dispatch({type: AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/users');
        })
        .catch(function(error){
            dispatch(authError(error.response.data.error));
        });
    }
}

export function getOfficeWork() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/app_dev.php/office_work/assistant`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
        .then(response => {
            dispatch({type: GET_OFFICE_WORK, payload: response.data});
        })
        .catch(error => {
            browserHistory.push('/');
        });
    }
}
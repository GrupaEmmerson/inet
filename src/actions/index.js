import axios from 'axios';
import { browserHistory } from 'react-router';
import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE, GET_USERS, GET_USER, GET_OFFICE_WORK, GET_MY_DETAIL, GET_NEWS_LATEST, GET_TOP_EMMERSON_MONTH_OFFER, GET_TOP_EMMERSON_YEAR_OFFER, GET_TOP_EMMERSON_MONTH_OFFER_PREMIUM, GET_TOP_EMMERSON_YEAR_OFFER_PREMIUM, GET_TOP_EMMERSON_YEAR_TRANSACTION, GET_TOP_EMMERSON_MONTH_TRANSACTION, GET_TOP_EMMERSON_MONTH_HIGHEST_PROVISION, GET_TOP_EMMERSON_YEAR_HIGHEST_PROVISION } from './types';
import {API_URL} from '../Config/';
const ROOT_URL = API_URL;

axios.interceptors.response.use(undefined, function (error) {

  return new Promise(function(resolve, reject){
    if(error.response.status == '401' && error.config){
      axios.post(`${ROOT_URL}/oauth/v2/token`, {
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

    axios.get(`${ROOT_URL}/users`, {
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
export function getLoggedUserDetail() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/user/my_detail`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
                dispatch({type: GET_MY_DETAIL, payload: response.data});
            })
            .catch(error => {
                browserHistory.push('/');
            });
    }
}
export function signinUser({email, password}){

  return function(dispatch){
    axios.post(`${ROOT_URL}/oauth/v2/token`, {
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
    axios.post(`${ROOT_URL}/v1/create`, {"user":{"username": email, "password": password, "email": email+"@emmerson.pl"}})
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

        axios.post(`${ROOT_URL}/v1/delete`, {"id":id})
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

        axios.get(`${ROOT_URL}/office_work/assistant`, {
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

export function getTopEmmersonMonthOffer() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/matches/top_emmerson/office/offer/month`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
                dispatch({type: GET_TOP_EMMERSON_MONTH_OFFER, payload: response.data});
            })
            .catch(error => {
                browserHistory.push('/');
            });
    }
}

export function getTopEmmersonYearOffer() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/matches/top_emmerson/office/offer/year`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
                dispatch({type: GET_TOP_EMMERSON_YEAR_OFFER, payload: response.data});
            })
            .catch(error => {
                browserHistory.push('/');
            });
    }
}

export function getTopEmmersonMonthOfferPremium() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/matches/top_emmerson/office/offer_premium/month`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
                dispatch({type: GET_TOP_EMMERSON_MONTH_OFFER_PREMIUM, payload: response.data});
            })
            .catch(error => {
                browserHistory.push('/');
            });
    }
}

export function getTopEmmersonYearOfferPremium() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/matches/top_emmerson/office/offer_premium/year`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
                dispatch({type: GET_TOP_EMMERSON_YEAR_OFFER_PREMIUM, payload: response.data});
            })
            .catch(error => {
                browserHistory.push('/');
            });
    }
}

export function getTopEmmersonMonthTransactions() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/matches/top_emmerson/transactions/month`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
                dispatch({type: GET_TOP_EMMERSON_MONTH_TRANSACTION, payload: response.data});
            })
            .catch(error => {
                browserHistory.push('/');
            });
    }
}


export function getTopEmmersonYearTransactions() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/matches/top_emmerson/transactions/year`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
                dispatch({type: GET_TOP_EMMERSON_YEAR_TRANSACTION, payload: response.data});
            })
            .catch(error => {
                browserHistory.push('/');
            });
    }
}

export function getTopEmmersonMonthHighestProvision() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/matches/top_emmerson/transactions/highest_provision/month`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
                dispatch({type: GET_TOP_EMMERSON_MONTH_HIGHEST_PROVISION, payload: response.data});
            })
            .catch(error => {
                browserHistory.push('/');
            });
    }
}


export function getTopEmmersonYearHighestProvision() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/matches/top_emmerson/transactions/highest_provision/year`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
                dispatch({type: GET_TOP_EMMERSON_YEAR_HIGHEST_PROVISION, payload: response.data});
            })
            .catch(error => {
                browserHistory.push('/');
            });
    }
}

export function getNewsLatest() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/news/latest`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
                dispatch({type: GET_NEWS_LATEST, payload: response.data});
            })
            .catch(error => {
                browserHistory.push('/');
            });
    }
}


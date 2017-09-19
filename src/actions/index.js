import axios from 'axios';
import { browserHistory } from 'react-router';
import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE, GET_USERS, GET_USER, GET_OFFICE_WORK, GET_MY_DETAIL,
    GET_NEWS_LATEST, GET_HELPDESK_CASES, GET_USER_CARD } from './types';
import {API_URL} from '../Config/';
const ROOT_URL = API_URL;
const topEmm = {};
let idContener = {}, firstIdCointainer = {};
let controlNumber = 0, loopNumber ;

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

export function getHelpdeskCaseAndCategory() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/helpdesk/cases`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
                dispatch({type: GET_HELPDESK_CASES, payload: response.data});
            })
            .catch(error => {
                browserHistory.push('/');
            });
    }
}

export function getUserCard() {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/matches/top_emmerson`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
            .then(
                response => {
                firstIdCointainer = response.data;
                // console.log(firstIdCointainer);
                idContener[0] = firstIdCointainer.top_emmerson[0].highest_commercial_month.id;
                idContener[1] = firstIdCointainer.top_emmerson[0].highest_primary_month.id ;
                idContener[2] = firstIdCointainer.top_emmerson[0].highest_secondary_month.id ;
                idContener[3] = firstIdCointainer.top_emmerson[1].highest_commercial_year.id ;
                idContener[4] = firstIdCointainer.top_emmerson[1].highest_primary_year.id ;
                idContener[5] = firstIdCointainer.top_emmerson[1].highest_secondary_year.id ;
                idContener[6] = firstIdCointainer.top_emmerson[2].top_transaction_month ;
                idContener[7] = firstIdCointainer.top_emmerson[2].top_transaction_month_advicer ;
                idContener[8] = firstIdCointainer.top_emmerson[2].top_transaction_month_per_advicer ;
                idContener[9] = firstIdCointainer.top_emmerson[3].top_transaction_year ;
                idContener[10] = firstIdCointainer.top_emmerson[3].top_transaction_year_advicer ;
                idContener[11] = firstIdCointainer.top_emmerson[3].top_transaction_year_per_advicer ;
                idContener[12] = firstIdCointainer.top_emmerson[4].top_offer_month.id ;
                idContener[13] = firstIdCointainer.top_emmerson[4].top_offer_advicer_month.id ;
                idContener[14] = firstIdCointainer.top_emmerson[4].top_offer_per_advicer_month.id ;
                idContener[15] = firstIdCointainer.top_emmerson[5].top_offer_premium_month.id ;
                idContener[16] = firstIdCointainer.top_emmerson[5].top_offer_premium_advicer_month.id ;
                idContener[17] = firstIdCointainer.top_emmerson[5].top_offer_premium_per_advicer_month.id ;
                idContener[18] = firstIdCointainer.top_emmerson[6].top_offer_year.id ;
                idContener[19] = firstIdCointainer.top_emmerson[6].top_offer_advicer_year.id ;
                idContener[20] = firstIdCointainer.top_emmerson[6].top_offer_per_advicer_year.id ;
                idContener[21] = firstIdCointainer.top_emmerson[7].top_offer_premium_year.id ;
                idContener[22] = firstIdCointainer.top_emmerson[7].top_offer_premium_advicer_year.id ;
                idContener[23] = firstIdCointainer.top_emmerson[7].top_offer_premium_per_advicer_year.id ;
                // console.log(idContener);
            }
            )
            .then(
                response => {
                        axios.get(`${ROOT_URL}/users/businessCard/${idContener[0]}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                                Accept: 'application/json'
                            }
                        })
                            .then(response => {
                                topEmm[0] = response.data;
                                // console.log(topEmm);
                            });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[1]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[1] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[2]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[2] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[3]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[3] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[4]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[4] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[5]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[5] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[6]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[6] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[7]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[7] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[8]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[8] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[9]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[9] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[10]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[10] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[11]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[11] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[12]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[12] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[13]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[13] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[14]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[14] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[15]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[15] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[16]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[16] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[17]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[17] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[18]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[18] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[19]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[19] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[20]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[20] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[21]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[21] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[22]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[22] = response.data;
                            // console.log(topEmm);
                        });
                    axios.get(`${ROOT_URL}/users/businessCard/${idContener[23]}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            Accept: 'application/json'
                        }
                    })
                        .then(response => {
                            topEmm[23] = response.data;
                            // console.log(topEmm);
                        });
                }
            )
            .then(
                response => {
                    // console.log(topEmm);
                    dispatch({type: GET_USER_CARD, payload: topEmm});
                }
            )
            .catch(error => {
                browserHistory.push('/');
            })
    }
}

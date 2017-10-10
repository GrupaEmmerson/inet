import axios from 'axios';
import { browserHistory } from 'react-router';
import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, GET_USERS, GET_OFFICE_WORK, GET_MY_DETAIL,
    GET_NEWS_LATEST, GET_HELPDESK_CASES, GET_USER_CARD, GET_POSZUKIWANIE_OFERTA, STATUS_CREATE, STATUS_NOT_CREATE } from './types';
import {API_URL} from '../Config/';
const ROOT_URL = API_URL;
const topEmm = [];
let firstIdCointainer = [];

axios.interceptors.response.use(undefined, function (error) {

    return new Promise(function(resolve, reject){

        if(error.response.status == '401' && error.config)
        {
            axios.post(`${ROOT_URL}/oauth/v2/token`,
            {
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

export function getLoggedUserDetail()
{
    return function (dispatch)
    {
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
    localStorage.removeItem('refresh_token');
    localStorage.clear();
    return { type: UNAUTH_USER };
}

export function signupUser({email, password}){
    return function(dispatch){
        axios.post(`${ROOT_URL}/v1/create`, {"user":{"username": email, "password": password, "email": email+"@emmerson.pl"}})
        .then(response => {
            dispatch({type: AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/');
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
            browserHistory.push('/');
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

export function getPoszukiwanieOferta() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/office_work/assistant/choice`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json'
            }
        })
        .then(response => {
            dispatch({type: GET_POSZUKIWANIE_OFERTA, payload: response.data});
        })
        .catch(error => {
            browserHistory.push('/');
        });
    }
}

export function getUsersGroupByTeams() {
    return function (dispatch) {

        axios.get(`${ROOT_URL}/users/group_by_teams`, {
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

function findCard(id, number) {
    axios.get(`${ROOT_URL}/users/businessCard/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json'
        }
    })
    .then(response => {
        topEmm[number] = response.data;
    });
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
                findCard(firstIdCointainer.top_emmerson[0].highest_commercial_month.id, 0 );
                findCard(firstIdCointainer.top_emmerson[0].highest_primary_month.id, 1 );
                findCard(firstIdCointainer.top_emmerson[0].highest_secondary_month.id, 2 );
                findCard(firstIdCointainer.top_emmerson[1].highest_commercial_year.id, 3 );
                findCard(firstIdCointainer.top_emmerson[1].highest_primary_year.id, 4 );
                findCard(firstIdCointainer.top_emmerson[1].highest_secondary_year.id, 5 );
                findCard(firstIdCointainer.top_emmerson[2].top_transaction_month, 6 );
                findCard(firstIdCointainer.top_emmerson[2].top_transaction_month_advicer, 7 );
                findCard(firstIdCointainer.top_emmerson[2].top_transaction_month_per_advicer, 8 );
                findCard(firstIdCointainer.top_emmerson[3].top_transaction_year, 9 );
                findCard(firstIdCointainer.top_emmerson[3].top_transaction_year_advicer, 10 );
                findCard(firstIdCointainer.top_emmerson[3].top_transaction_year_per_advicer, 11 );
                findCard(firstIdCointainer.top_emmerson[4].top_offer_month.id , 12 );
                findCard(firstIdCointainer.top_emmerson[4].top_offer_advicer_month.id, 13 );
                findCard(firstIdCointainer.top_emmerson[4].top_offer_per_advicer_month.id, 14 );
                findCard(firstIdCointainer.top_emmerson[5].top_offer_premium_month.id, 15 );
                findCard(firstIdCointainer.top_emmerson[5].top_offer_premium_advicer_month.id , 16 );
                findCard(firstIdCointainer.top_emmerson[5].top_offer_premium_per_advicer_month.id, 17 );
                findCard(firstIdCointainer.top_emmerson[6].top_offer_year.id , 18 );
                findCard(firstIdCointainer.top_emmerson[6].top_offer_advicer_year.id, 19 );
                findCard(firstIdCointainer.top_emmerson[6].top_offer_per_advicer_year.id , 20 );
                findCard(firstIdCointainer.top_emmerson[7].top_offer_premium_year.id, 21 );
                findCard(firstIdCointainer.top_emmerson[7].top_offer_premium_advicer_year.id , 22 );
                findCard(firstIdCointainer.top_emmerson[7].top_offer_premium_per_advicer_year.id , 23 );
        }
        )
        .then(
            function (){
                dispatch({type: GET_USER_CARD, payload: topEmm});
            }
        )
        .catch(error => {
            browserHistory.push('/')
        });
    }
}

function commaToDot(stringNumber) {
    return stringNumber.split(",").join(".");
}

export function createOfficeWork(
    {
        user,
        team,
        plannedTransaction,
        event,
        offer,
        presentation,
        symbol,
        provision,
        date,
        count
    }
)
{
    return function(dispatch){
        axios.post(`${ROOT_URL}/office_work/assistant/create`, {"office_work":{
            "user": parseInt(user),
            "team": parseInt(team),
            "plannedTransaction": parseInt(plannedTransaction),
            "event": parseInt(event),
            "offer": parseInt(offer),
            "presentation": parseInt(presentation),
            "symbol": symbol,
            "provision": provision ? parseFloat(commaToDot(provision)) : null,
            "data": date ? date.format('YYYY-MM-DD') : null,
            "count": parseInt(count)
        }})
        .then(response => {
            if(response.status === 201){
                dispatch({type: STATUS_CREATE, payload: true});
            }
        })
        .catch(function(error){
            dispatch({type: STATUS_NOT_CREATE, payload: false});
            dispatch(authError(error.response.data.error));
        });
    }
}
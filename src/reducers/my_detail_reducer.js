import {
    GET_MY_DETAIL
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_MY_DETAIL:
            return { ...state, my_detail: action.payload };
    }
    return state;
}
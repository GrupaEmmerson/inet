import {
    GET_USER_CARD
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_USER_CARD:
            return { ...state, user_card: action.payload };
    }
    return state;
}
import {
    GET_HELPDESK_CASES
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_HELPDESK_CASES:
            return { ...state, helpdesk_cases: action.payload };
    }
    return state;
}
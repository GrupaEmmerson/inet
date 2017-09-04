import {
    GET_TOP_EMMERSON_MONTH_HIGHEST_PROVISION
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_TOP_EMMERSON_MONTH_HIGHEST_PROVISION:
            return { ...state, top_emmerson_month_highest_provision: action.payload };
    }
    return state;
}
import {
    GET_TOP_EMMERSON_MONTH_OFFER
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_TOP_EMMERSON_MONTH_OFFER:
            return { ...state, top_emmerson_month_offer: action.payload };
    }
    return state;
}
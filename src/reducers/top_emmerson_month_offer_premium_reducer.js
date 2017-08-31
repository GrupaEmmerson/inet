import {
    GET_TOP_EMMERSON_MONTH_OFFER_PREMIUM
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_TOP_EMMERSON_MONTH_OFFER_PREMIUM:
            return { ...state, top_emmerson_month_offer_premium: action.payload };
    }
    return state;
}
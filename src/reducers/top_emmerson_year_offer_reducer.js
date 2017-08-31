import {
    GET_TOP_EMMERSON_YEAR_OFFER
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_TOP_EMMERSON_YEAR_OFFER:
            return { ...state, top_emmerson_year_offer: action.payload };
    }
    return state;
}
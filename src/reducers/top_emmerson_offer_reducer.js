import {
    GET_TOP_EMMERSON_OFFER
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_TOP_EMMERSON_OFFER:
            return { ...state, top_emmerson_offer: action.payload };
    }
    return state;
}
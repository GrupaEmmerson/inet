import {
    GET_POSZUKIWANIE_OFERTA
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_POSZUKIWANIE_OFERTA:
            return { ...state, offer_search: action.payload };
    }
    return state;
}
import {
    GET_TOP_EMMERSON_YEAR_TRANSACTION
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_TOP_EMMERSON_YEAR_TRANSACTION:
            return { ...state, top_emmerson_year_transaction: action.payload };
    }
    return state;
}
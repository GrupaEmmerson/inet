import {
    GET_TOP_EMMERSON_MONTH_TRANSACTION
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_TOP_EMMERSON_MONTH_TRANSACTION:
            return { ...state, top_emmerson_month_transaction: action.payload };
    }
    return state;
}
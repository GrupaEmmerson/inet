import {
    GET_OFFICE_WORK
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_OFFICE_WORK:
            return { ...state, office_work: action.payload };
    }
    return state;
}
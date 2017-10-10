import {
    STATUS_CREATE,
    STATUS_NOT_CREATE
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case STATUS_CREATE:
            return { ...state, created: action.payload };
        case STATUS_NOT_CREATE:
            return { ...state, created: action.payload };
        default:
            return {...state, created: false }
    }
}

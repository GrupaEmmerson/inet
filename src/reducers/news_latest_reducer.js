import {
    GET_NEWS_LATEST
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_NEWS_LATEST:
            return { ...state, news_latest: action.payload };
    }
    return state;
}


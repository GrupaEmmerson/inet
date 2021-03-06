import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import usersReducer from './users_reducer';
import myDetailReducer from './my_detail_reducer';
import userReducer from './user_reducer';
import officeWorkReducer from './office_work_reducer';
import newsLatestReducer from './news_latest_reducer';
import userCardReducer from './user_card_reducer';
import helpdeskCases from './helpdesk_cases_reducer';
import offerSearch from './offier_search_reducer';
import createdReducer from './status_create_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  created: createdReducer,
  users: usersReducer,
  user: userReducer,
  my_detail: myDetailReducer,
  office_work: officeWorkReducer,
  helpdesk_cases: helpdeskCases,
  news_latest: newsLatestReducer,
  user_card: userCardReducer,
  offer_search: offerSearch,

});

export default rootReducer;

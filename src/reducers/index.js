import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import usersReducer from './users_reducer';
import myDetailReducer from './my_detail_reducer';
import userReducer from './user_reducer';
import officeWorkReducer from './office_work_reducer';
import newsLatestReducer from './news_latest_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  users: usersReducer,
  user: userReducer,
  my_detail: myDetailReducer,
  office_work: officeWorkReducer,
  news_latest: newsLatestReducer,
});

export default rootReducer;

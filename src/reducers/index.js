import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import usersReducer from './users_reducer';
import myDetailReducer from './my_detail_reducer';
import userReducer from './user_reducer';
import officeWorkReducer from './office_work_reducer';
import topEmmersonMonthOffer from './top_emmerson_month_offer_reducer';
import topEmmersonYearOffer from './top_emmerson_year_offer_reducer';
import topEmmersonMonthOfferPremium from './top_emmerson_month_offer_premium_reducer';
import topEmmersonYearOfferPremium from './top_emmerson_year_offer_premium_reducer';
import topEmmersonMonthTransaction from './top_emmerson_month_transaction_reducer';
import topEmmersonYearTransaction from './top_emmerson_year_transaction_reducer';
import topEmmersonMonthHighestProvision from './top_emmerson_month_highest_provision_reducer';
import topEmmersonYearHighestProvision from './top_emmerson_year_highest_provision_reducer';
import newsLatestReducer from './news_latest_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  users: usersReducer,
  user: userReducer,
  my_detail: myDetailReducer,
  office_work: officeWorkReducer,
  top_emmerson_month_offer: topEmmersonMonthOffer,
  top_emmerson_year_offer: topEmmersonYearOffer,
  top_emmerson_month_offer_premium: topEmmersonMonthOfferPremium,
  top_emmerson_year_offer_premium: topEmmersonYearOfferPremium,
  top_emmerson_month_transaction: topEmmersonMonthTransaction,
  top_emmerson_year_transaction: topEmmersonYearTransaction,
  top_emmerson_month_highest_provision: topEmmersonMonthHighestProvision,
  top_emmerson_year_highest_provision: topEmmersonYearHighestProvision,
  news_latest: newsLatestReducer
});

export default rootReducer;

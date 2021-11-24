import uiReducer from './ui.reducers';
import authReducer from './auth.reducer';
import chatsReducer from './chats.reducer';
import vendorsReducer from './vendors.reducer';
import notificationsReducer from './notifications.reducer';
import ordersReducer from './orders.reducer';
import salesReducer from './sales.reducer';
import paymentsReducer from './payments.reducer';
import userReducer from './users.reducer';
import nationalAdminsReducer from './nationalAdmins.reducer'
import pricesReducer from './prices.reducer'
import withdrawalRequests from './withdrawalRequest.reducer';

import { combineReducers } from "redux";

const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  chats: chatsReducer,
  vendors: vendorsReducer,
  notification: notificationsReducer,
  orders: ordersReducer,
  salesReducer: salesReducer,
  payments: paymentsReducer,
  users: userReducer,
  nationalAdmins: nationalAdminsReducer,
  prices:pricesReducer,
  withdrawalRequests: withdrawalRequests
});

export default reducers
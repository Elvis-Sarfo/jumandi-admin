import uiReducer from './ui.reducers';
import authReducer from './auth.reducer';
import chatsReducer from './chats.reducer';
import vendorsReducer from './vendors.reducer';
import notificationsReducer from './notifications.reducer';
import ordersReducer from './orders.reducer';
import salesReducer from './sales.reducer';
import userReducer from './users.reducer';
import nationalAdminsReducer from './nationalAdmins.reducer'
import pricesReducer from './prices.reducer'
import withdrawalRequestsReducer from './withdrawalRequest.reducer';
import paymentsReducer from './payments.reducer'

import { combineReducers } from "redux";

const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  chats: chatsReducer,
  vendors: vendorsReducer,
  notification: notificationsReducer,
  orders: ordersReducer,
  sales: salesReducer,
  users: userReducer,
  nationalAdmins: nationalAdminsReducer,
  prices:pricesReducer,
  withdrawalRequests: withdrawalRequestsReducer,
  payments: paymentsReducer
});

export default reducers
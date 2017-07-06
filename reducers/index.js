/**
 * Created by consultadd on 17/2/17.
 */
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import dataReducer from './dataReducer'
import dashboardReducer from './dashboardReducer'
import orderReducer from './orderReducer'
import couponReducer from './couponReducer'
import showReducer from './showReducer'
import theatreReducer from './theatreReducer'
import campaignReducer from './campaignReducer'
import transactionReducer from './transactionReducer'
import eventDashboardReducer from './eventDasboardReducer'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { campaigns, coupons } from '../components/common/models'
import { combineForms } from 'react-redux-form'

export default combineReducers({
  auth: authReducer,
  data: dataReducer,
  dash: dashboardReducer,
  order: orderReducer,
  coupon: couponReducer,
  show: showReducer,
  theatre: theatreReducer,
  campaign: campaignReducer,
  transaction: transactionReducer,
  event_dash: eventDashboardReducer,
  form: combineForms({
    coupons: coupons,
    campaign: campaigns,
  }, 'form'),
  loading: loadingBarReducer
})
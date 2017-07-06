/**
 * Created by consultadd on 9/2/17.
 */
const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

//abhishek
routes.add('order', '/tixdoadmin/order', 'order')
routes.add('coupon', '/tixdoadmin/coupon', 'coupon')
routes.add('campaign', '/tixdoadmin/campaign', 'campaign')
routes.add('addCoupon', '/tixdoadmin/add/coupon', 'addCouponForm')
routes.add('campForm', '/tixdoadmin/add/campaign', 'addCampaignForm')
routes.add('couponFormUpdate', '/tixdoadmin/couponupdate/:id', 'addCouponForm')
routes.add('campaignFormUpdate', '/tixdoadmin/campaignupdate/:id', 'addCampaignForm')
routes.add('movieorderdetail', '/tixdoadmin/movieorderdetail/:id', 'orderdetail')
routes.add('eventorder', '/tixdoadmin/eventdetail/:id', 'eventorderdetail')

//common
routes.add('error', '/tixdoadmin/error/:obj', 'error')

//manish
routes.add('home', '/tixdoadmin', 'index')
routes.add('dashboard', '/tixdoadmin/dashboard', 'dashboard')
routes.add('movieorder', '/tixdoadmin/movieorder', 'movieOrder')
routes.add('paymenthistory', '/tixdoadmin/paymenthistory', 'paymenthistory')
routes.add('batchwisereport', '/tixdoadmin/batchwisereport/:id', 'batchwisereport')
routes.add('perordertransaction', '/tixdoadmin/perordertransaction', 'perordertransaction')
routes.add('theatrereport', '/tixdoadmin/theatrereportpage', 'theatrereportpage')
routes.add('batchreport', '/tixdoadmin/batchreport/:type/:parentId/:batchName/:status', 'batchreport')

//event dashboard
routes.add('eventdashboard', '/tixdoadmin/eventdashboard', 'eventdashboard')
routes.add('organisereventlist', '/tixdoadmin/organisereventlist/:id', 'organisereventlist')
routes.add('eventdashorderlist', '/tixdoadmin/eventdashorderlist/:id', 'eventdashorderlist')

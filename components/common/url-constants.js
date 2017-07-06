// root urls

let URL = "https://tixdo.com";
let URL1 = "https://tixdo.com";
let URL3 = 'http://192.168.39.14:8002';
let BASEURL3 = URL3 + '/api/v1/'
let BASEURL = URL + '/api/v1/'
let BASEURL1 = URL + '/api/v1/'
let NEWBASEURL = URL + '/api/v2/'
let CRMURL = URL + '/api/crm/'
let OTP_BASE_URL = 'https://sendotp.msg91.com/api/'
export const MEDIAURL = URL
const AUTHURL = URL + '/api/rest-auth/'
const AUTHURL1 = URL1 + '/api/rest-auth/'
const AUTH_USER_BASE_URL = URL + '/api/users/'

export const URLS = {

  //event and event dashboard url

  GET_EVENT_MEMBERS: CRMURL + 'orgdashboard/main/',
  GET_EVENTS_ORG_ID: CRMURL + 'orgdashboard/get_events_by_org_id/?id=',
  GET_ORDERS_BY_EVENTS: CRMURL + 'orgdashboard/get_eventorders_by_event/?event_id=',
  GET_NORMAL_EXCEL_VIEW: CRMURL + 'orgdashboard/export_excel_org/?event_id=',
  GET_DETAIL_EXCEL_VIEW: CRMURL + 'orgdashboard/export_excel_org_detail/?event_id=',
  GET_All_Orders_In_Excel: CRMURL + 'orgdashboard/export_all_org_orders_excel/',
  GET_Single_Org_Orders_In_Excel: CRMURL + 'orgdashboard/export_single_org_orders_excel/?organisation_id=',
  GETORDER: CRMURL + 'orders/',
  GETEVENTORDER: CRMURL + 'event-orders/',
  GETALLMOVIEORDER: CRMURL + 'movie-orders/',
  GETORDERBYID: CRMURL + 'movie-orders/get_order_by_id/?order_id=',
  GETORDERBYEVENTID: CRMURL + 'event-orders/get_order_by_id/?order_id=',
  GETEVENTDATETIME: CRMURL + 'event-orders/showdate_by_event/',
  GETMOVIECAMPAIGN: CRMURL + 'campaigns/get_filtered_movie/?query=',
  GETCITYCAMPAIGN: CRMURL + 'campaigns/get_filtered_city/?query=',
  GETEVENTCAMPAIGN: CRMURL + 'campaigns/get_filtered_event/?query=',
  GETTHEATRECHAINCAMPAIGN: CRMURL + 'campaigns/get_filtered_theatre_chain/',
  GETDISCOUNTTYPECAMPAIGN: CRMURL + 'campaigns/get_discount_type/',
  GETCAMPAIGNTYPECAMPAIGN: CRMURL + 'campaigns/get_campaign_type/',
  GETCOUPONTYPECAMPAIGN: CRMURL + 'campaigns/get_coupon_type/',
  GETTHEATRECAMPAIGN: CRMURL + 'campaigns/get_filtered_theaters/?query=',
  GETCAMPAIGNLIST: CRMURL + 'coupons/get_filtered_campaigns/?query=',
  GETTRANSACTIONS: CRMURL + 'transactions/',
  GETTHEATRES: CRMURL + 'theatres/',
  GETTHEATRECHAIN: CRMURL + 'theatre-source/',
  GETENABLETHEATRECHAINLIST: CRMURL + 'theatre-source/?search=',
  GETDISABLETHEATRECHAINLIST: CRMURL + 'theatre-source/?search=',
  GETDISABLEBUTTONCHAIN: CRMURL + 'theatre-source/disable_theatre_chain/',
  GETUNABLEBUTTONCHAIN: CRMURL + 'theatre-source/enable_theatre_chain/',
  GETDISABLEBUTTON: CRMURL + 'theatres/disable_theatre/?theatre_id=',
  GETUNABLEBUTTON: CRMURL + 'theatres/enable_theatre/?theatre_id=',
  GETSHOWS: CRMURL + 'shows/',
  GETSHOWDISABLEBUTTON: CRMURL + 'shows/disable_show/?show_id=',
  GETSHOWUNABLEBUTTON: CRMURL + 'shows/enable_show/?show_id=',
  GETCAMPAIGN: CRMURL + 'campaigns/',
  GETDELETECAMPAIGN: CRMURL + 'campaigns/delete_multiple/',
  GETDELETECOUPON: CRMURL + 'coupons/delete_multiple/',
  GETCOUPON: CRMURL + 'coupons/',
  GETFILTERTHEATRE: CRMURL + 'orders/get_filtered_theaters/?query=',
  GETFILTERCITY: CRMURL + 'shows/get_filtered_cities/?query=',
  GETFILTERMOVIE: CRMURL + 'shows/get_filtered_moviename/?query=',
  GETFILTERTHEATRESHOW: CRMURL + 'shows/get_filtered_theatre/?query=',
  GETFILTERTIMESHOW: CRMURL + 'shows/get_filtered_show_dates/?query=',
  GETRESENDBUTTON: CRMURL + 'movie-orders/resend_sms_email/?order_id=',
  GETCANCELBUTTON: CRMURL + 'movie-orders/show_cancle_inform/?order_id=',
  GETREFUNDBUTTON: CRMURL + 'movie-orders/refund_by_order_id/?order_id=',
  GETEVENTRESENDBUTTON: CRMURL + 'event-orders/resend_sms_email/?order_id=',
  GETEVENTCANCELBUTTON: CRMURL + 'event-orders/show_cancle_inform/?order_id=',
  GETEVENTREFUNDBUTTON: CRMURL + 'event-orders/refund_by_order_id/?order_id=',
  GETREFUNDTRANSBUTTON: CRMURL + 'transactions/refund_by_order_id/?order_id=',
  GETFILTEREVENT: CRMURL + 'orders/get_filtered_events/?query=',
  GETGENERICFORM: CRMURL + 'orders/get_fields_detail/?model_name=',
  GETMULTIUSERDATA: CRMURL + 'coupons/get_filtered_users/?query=',
  GETGENERICUPDATEFORM: CRMURL,

  // admin and cinema dashboard urls

  GETMOVIEORDER: BASEURL + 'movie-report/movie_order_detail/',
  GETMOVIEORDERSUMMARY: BASEURL + 'movie-report/movie_order_summary/',
  GETALLFILTERS: BASEURL + 'movie-report/get_all_filters/',
  GETCITIES: BASEURL + 'citymovies/cities/',
  GETMOVIE: BASEURL + 'citymovies/movies/',
  GETMOVIEBYID: BASEURL + 'movies/',
  SIGNUP: AUTHURL + 'registration/v2/',
  DASHBOARDLOGIN: AUTHURL + 'v2/dashboard-login/',
  GETTHEATREWISEREPORT: BASEURL + 'movie-report/theatre_wise_report/',
  // GETPAIDSTATUS: NEWBASEURL+"payment-history/get_payment_history_paid_status/",
  // GETDUESTATUS: NEWBASEURL+"payment-history/get_payment_history_due_status/",
  GETPAYMENTSTATUS: NEWBASEURL + 'payment-history/get_reports_moviepartner/',
  GETPAYMENT: NEWBASEURL + 'finalreport/mark_as_paid/',
  GETCUMMULATIVEREPORT: NEWBASEURL + 'finalreport/view_cummulative_report/',
  GETDOWNLOAD: NEWBASEURL + 'excelreport/generate_excel/',
  GETDOWNLOADCUMMULATIVE: NEWBASEURL + 'excelreport/download_cummulative_report/',
  GETDETAILREPORT: NEWBASEURL + 'finalreport/report_for_moviepartner/',
  GETORDERSUMMARY: BASEURL1 + 'report/order_summary/',
  GETPAYMENTSUMMARY: NEWBASEURL + 'finalreport/payment_summary/',
  GETREPORTSUMMARY: NEWBASEURL + 'finalreport/report_summary/',
  // GETORDERDOWNLOAD:  BASEURL3+"?start=02/20/2017&report_type=order&filename=trial",
  // 192.168.39.14:8002//api/download/?start=02/20/2017&report_type=order&filename=trial
  GETORDERDOWNLOAD: BASEURL + 'movie-report/movie_order_detail/',
  GETTHEATREDOWNLOAD: BASEURL + 'movie-report/theatre_wise_report/',
  GETPAIDREPORTDETAIL: NEWBASEURL + 'payment-history/get_paid_report_detail/',
  GETBADGEWISEREPORT: NEWBASEURL + 'finalreport/batched_report_for_moviepartner/',
  GETDETAILBADGEREPORT: NEWBASEURL + 'finalreport/detail_batched_report/',
  GETBADGEREPORTDOWNLOAD: NEWBASEURL + 'excelreport/download_batched_report/',
  GETUPLOADFILE: NEWBASEURL + 'finalreport/upload_excel/',
  GETMARKINDIVIDUALASPAID: NEWBASEURL + 'finalreport/mark_individual_as_paid/',

  //common urls

  LOGIN: AUTHURL + 'v2/login/',
  AUTH_USER_LOGOUT: URL1 + '/api/rest-auth/logout/',

}

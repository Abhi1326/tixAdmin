export const types = {
  //auth reducer

  save_user: 'save_user',
  invalid_user: 'invalid_user',
  remove_user: 'remove_user',
  valid_user: 'valid_user',

  //campaign reducer

  fetch_campaign: 'fetch_campaign',
  fetch_updateformcamp_data: 'fetch_updateformcamp_data',
  fetch_event_data: 'fetch_event_data',
  fetch_movie_data: 'fetch_movie_data',
  fetch_theatre_data: 'fetch_theatre_data',
  fetch_city_data: 'fetch_city_data',
  fetch_theatrechain_data: 'fetch_theatrechain_data',
  fetch_discounttype_data: 'fetch_discounttype_data',
  fetch_campaigntype_data: 'fetch_campaigntype_data',
  fetch_campaigncoupon_data: 'fetch_campaigncoupon_data',
  remove_deleted_elements: 'remove_deleted_elements',
  add_campaign_to_list: 'add_campaign_to_list',
  update_campaign_list: 'update_campaign_list',

  //coupon Reducer

  fetch_coupon: 'fetch_coupon',
  fetch_form_data: 'fetch_form_data',
  fetch_updateform_data: 'fetch_updateform_data',
  fetch_campaignlist_data: 'fetch_campaignlist_data',
  remove_deletedcoup_elements: 'remove_deletedcoup_elements',
  add_coupon_to_list: 'add_coupon_to_list',
  update_coupon_list: 'update_coupon_list',

  //dashboard Reducer

  fetch_report_summary: 'fetch_report_summary',
  fetch_payment_summary: 'fetch_payment_summary',
  fetch_order_summary: 'fetch_order_summary',
  fetch_detail_report: 'fetch_detail_report',
  fetch_badge_report: 'fetch_badge_report',
  fetch_batch_report: 'fetch_batch_report',
  payment_response: 'payment_response',
  fetch_filter_batch_report: 'fetch_filter_batch_report',
  fetch_mark_individual_as_paid: 'fetch_mark_individual_as_paid',

  //data Reducer

  fetch_movie_order: 'fetch_movie_order',
  fetch_movie_order_detail: 'fetch_movie_order_detail',
  fetch_all_filter: 'fetch_all_filter',
  fetch_all_city: 'fetch_all_city',
  fetch_all_theatre: 'fetch_all_theatre',
  fetch_all_movie: 'fetch_all_movie',
  fetch_all_accounts: 'fetch_all_accounts',
  is_fetching: 'is_fetching',
  fetch_payment_status: 'fetch_payment_status',
  fetch_theatre_wise_report: 'fetch_theatre_wise_report',
  fetch_theatre_wise_filtered_report: 'fetch_theatre_wise_filtered_report',
  fetch_full_theatre_report: 'fetch_full_theatre_report',
  fetch_due_status: 'fetch_due_status',
  fetch_paid_detail: 'fetch_paid_detail',

  //event Dashboard Reducer

  fetch_event_partner: 'fetch_event_partner',
  fetch_event_org_id: 'fetch_event_org_id',
  fetch_event_orders: 'fetch_event_orders',
  fetch_all_eventorder_date_time:'fetch_all_eventorder_date_time',

  //order Reducer

  fetch_all_order: 'fetch_all_order',
  fetch_event_order: 'fetch_event_order',
  fetch_filtered_theatre: 'fetch_filtered_theatre',
  fetch_filtered_event: 'fetch_filtered_event',
  fetch_order_detail: 'fetch_order_detail',
  clear_dateTime_list_event_order:'clear_dateTime_list_event_order',

  //show Reducer

  fetch_shows: 'fetch_shows',
  change_disable_object: 'change_disable_object',
  fetch_filtered_city:'fetch_filtered_city',
  fetch_filtered_theatre_show:'fetch_filtered_theatre_show',
  fetch_filtered_movie:'fetch_filtered_movie',
    fetch_shows_by_time:'fetch_shows_by_time',
  clear_time_list:'clear_time_list',

  //Theatre Reducer

  fetch_theatres: 'fetch_theatres',
  change_disabletheatre_object: 'change_disabletheatre_object',
  change_disabletheatrechain_object:'change_disabletheatrechain_object',
  fetch_filtered_city_theatre:'fetch_filtered_city_theatre',
  fetch_filtered_theatre_title:'fetch_filtered_theatre_title',

  //transaction Reducer

  fetch_transactions: 'fetch_transactions',
  fetch_transactions_by_order_id: 'fetch_transactions_by_order_id',
  refund_successfull: 'refund_successfull',

}
import { types } from '../actions/types'
const dashboardReducer = (state = {
                            paymentData: {},
                            reportData: [],
                            orderData: {},
                            detailReport: {},
                            badgeReport: {},
                            batchReport: {},
                            paymentResponse: {},

                          }, action) => {

  switch (action.type) {
    case types.fetch_report_summary:
      state = {
        ...state,
        reportData: action.payload
      }
      break
    case types.fetch_payment_summary:
      state = {
        ...state,
        paymentData: action.payload
      }
      break
    case types.fetch_order_summary:
      state = {
        ...state,
        orderData: {...action.payload}
      }
      break
    case types.fetch_detail_report:
      state = {
        ...state,
        detailReport: {...action.payload}
      }
      break
    case types.fetch_badge_report:
      state = {
        ...state,
        badgeReport: {...action.payload}
      }
      break
    case types.fetch_batch_report:
      state = {
        ...state,
        batchReport: {...action.payload}
      }
      break
    case types.payment_response:
      state = {
        ...state,
        paymentResponse: {...action.payload}
      }
      break
    case types.fetch_filter_batch_report:
      state = {
        ...state,
        badgeReport: {...action.payload}
      }
      break

    case types.fetch_mark_individual_as_paid:
      state = {
        ...state,
        batchReport: {
          ...state.batchReport,
          results: state.batchReport.results.map(report => {
            if (report.id === action.payload) {
              let newReport = {
                ...report,
                payment_status: 'paid'
              }
              return newReport
            }
            else {
              return report
            }
          })
        }
      }
      break
  }
  return state
}

export default dashboardReducer

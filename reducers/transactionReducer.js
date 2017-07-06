import { types } from '../actions/types'

const transactionReducer = (state = {
                              transactionObj: {},
                              transactionList: []

                            }, action) => {

  switch (action.type) {
    case types.fetch_transactions:
      state = {
        ...state,
        transactionObj: {...action.payload},
        transactionList: [...action.payload.results]

      }
      break
    case types.fetch_transactions_by_order_id:
      state = {
        ...state,

        transactionList: action.payload.results

      }

      break
    case types.refund_successfull:
      state = {
        ...state,
        transactionList: state.transactionList.map(transaction => {
          if (transaction.order_id === action.payload.order_id) {
            return {
              ...transaction,
              refunded: 'True'
            }
          }
          else {
            return transaction
          }

        })
      }

      break

  }

  return state
}

export default transactionReducer

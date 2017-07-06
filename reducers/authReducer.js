import { types } from '../actions/types'
const authReducer = (state = {
                       user: null,
                       isAuthenticated: false,
                       statusText: '',
                       statusCode: 404,
                       isServer: false
                     }, action) => {

  switch (action.type) {
    case types.save_user:
      state = {
        ...state,
        user: {
          group: action.payload.group,
          key: action.payload.key,
          userDetail: {
            phone: action.payload.phone,
            username: action.payload.username,
            email: action.payload.email
          }
        },

      }
      break
    case types.remove_user:
      state = {
        ...state,
        user: {},
        isAuthenticated: false

      }
      break
    case types.valid_user:
      state = {
        ...state,
        isAuthenticated: true

      }
      break
    case types.invalid_user:
      state = {
        ...state,
        user: {},
        isAuthenticated: false,
        statusText: action.payload.statusText,
        statusCode: action.payload.statusCode

      }
      break

  }
  return state
}

export default authReducer

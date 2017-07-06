import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { loadingBarMiddleware } from 'react-redux-loading-bar'

let store = null

export const initStore = (reducer, initialState, isServer) => {

  if (process.env.NODE_ENV === 'production') {
    if (isServer && typeof window === 'undefined') {
      return createStore(reducer, initialState, applyMiddleware(thunkMiddleware, loadingBarMiddleware()))
    } else {
      if (!store) {
        store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
      }
      return store
    }
  }
  else {
    if (isServer && typeof window === 'undefined') {
      return createStore(reducer, initialState, applyMiddleware(thunkMiddleware, logger(), loadingBarMiddleware()))
    } else {
      if (!store) {
        store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware, logger()))
      }
      return store
    }
  }
}

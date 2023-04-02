import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import confirmationReducer from './confirmation'

function createStore() {
  const thunkArguments = {}

  const customizedMiddleware = getDefaultMiddleware({
    thunk: {
      extraArgument: thunkArguments,
    },
  })

  const store = configureStore({
    reducer: {
      confirmation: confirmationReducer,
    },
    middleware: customizedMiddleware,
  })

  thunkArguments.store = store

  return store
}

export const store = createStore()

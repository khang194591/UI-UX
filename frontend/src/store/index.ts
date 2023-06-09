import { Store, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import roleReducer from '../modules/role/role.store'
import userReducer from '../modules/user/user.store'
import toastReducer from './slides/toast'
export interface ThunkExtraArguments {
  store: Store
}

function createStore() {
  const thunkArguments = {} as ThunkExtraArguments

  const customizedMiddleware = getDefaultMiddleware({
    thunk: {
      extraArgument: thunkArguments,
    },
  })

  const store = configureStore({
    reducer: {
      role: roleReducer,
      user: userReducer,
      toast: toastReducer,
    },
    middleware: customizedMiddleware,
  })

  thunkArguments.store = store

  return store
}

export const store = createStore()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

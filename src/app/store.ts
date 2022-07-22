import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersApi } from '../features/users/redux/service'
import {rtkQueryErrorLogger} from "./errorLogger";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    rtkQueryErrorLogger,
    usersApi.middleware,
  ],
})

// enable listener behavior for the store
setupListeners(store.dispatch)

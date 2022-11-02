import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersApi } from '../features/users/redux/service'
import { postsApi } from '../features/post_cache/redux/service'
import {rtkQueryErrorLogger} from "./errorLogger";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    rtkQueryErrorLogger,
    usersApi.middleware,
    postsApi.middleware,
  ],
})

setupListeners(store.dispatch) //  optional, but required for refetchOnFocus/refetchOnReconnect behaviors

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/users',
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<Array<unknown>, void>({
      query: () => '',
    }),
    getUserById: builder.query<Record<string, unknown>, string>({
      query: (id) => ({url: `/${id}`}),
      transformResponse: (response) => {
        console.log('response', response),
        return response
      },
    }),
  }),
})

export const { useGetAllUsersQuery, useGetUserByIdQuery } = usersApi

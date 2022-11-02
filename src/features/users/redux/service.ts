import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

type User = Record<string, unknown> & { name: string }

export const usersApi = createApi({
    reducerPath: 'usersApi',
    keepUnusedDataFor: 30, // global configuration for the api how long save cache (seconds)
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/users',
    }),
    endpoints: (builder) => ({
        getAllUsers: builder.query<Array<unknown>, void>({
            query: () => '',
        }),
        getUserById: builder.query<User, string>({
            query: (id) => ({url: `/${id}`}),
            keepUnusedDataFor: 5, // configuration for an individual endpoint how long save cache, overriding the api setting
            transformResponse: (response: User) => ({...response, extraField: 'test extra field'}),
        }),
        updateUser: builder.mutation<User, Partial<User>>(
            {
                query: ({id, ...body}) => ({
                    url: `/${id}`,
                    method: 'PATCH',
                    body,
                }),
                transformResponse: (response: User) => {
                    return {...response, extraField: 'test extra field'}
                },
            }
        )
    }),
})

export const {useGetAllUsersQuery, useGetUserByIdQuery, useUpdateUserMutation} = usersApi

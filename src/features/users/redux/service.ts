import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

type User = Record<string, unknown> & { name: string }

export const usersApi = createApi({
    reducerPath: 'usersApi',
    // global configuration for the api how long save cache
    keepUnusedDataFor: 30,
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/users',
    }),
    endpoints: (builder) => ({
        getAllUsers: builder.query<Array<unknown>, void>({
            query: () => '',
        }),
        getUserById: builder.query<User, string>({
            query: (id) => ({url: `/${id}`}),
            // configuration for an individual endpoint how long save cache, overriding the api setting
            keepUnusedDataFor: 5,
            transformResponse: (response: User) => {
                return {...response, extraField: 'test extra field'}
            },
        }),
        updateUser: builder.mutation<User, Partial<User>>(
            {
                // note: an optional `queryFn` may be used in place of `query`
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

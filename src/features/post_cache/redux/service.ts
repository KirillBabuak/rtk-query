import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

type Post = Record<string, unknown> & { id: number, name: string };
type Filter = { count: number, page: number };
const postCacheTag: any = {type: "Post"};
const postListCacheTag: any = {type: "Post", id: 'List'};

export const postsApi = createApi({
    reducerPath: 'postsApi',
    keepUnusedDataFor: 30,     // global configuration for the api how long save cache after unsubscription
    tagTypes: [postCacheTag.type], // register tag types
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/posts',
    }),
    endpoints: (builder) => ({
        getPosts: builder.query<Array<Post>, Filter>({
            query: ({count, page}) => `?count=${count}&page=${page}`,
            transformResponse: (response: Post[]) => {
                console.log('getPostsSuccess')
                return response
            },
            providesTags: (result, error, arg) =>
                result
                    ? [
                        // ...result.map(({id}) => ({type: postCacheTag.type, id})), // uncomment if we want to do request after update or delete post
                        postListCacheTag
                    ]
                    : [postListCacheTag],
        }),
        getPost: builder.query<Post, number>({
            query: (id) => ({url: `/${id}`}),
            providesTags: (result, error, arg) => [{type: postCacheTag.type, id: arg}],
            transformResponse: (response: Post) => {
                console.log('getPostSucess')
                return response
            },
        }),
        updatePost: builder.mutation<Post, Partial<Post>>(
            {
                query: ({id, ...body}) => ({
                    url: `/${id}`,
                    method: 'PATCH',
                    body,
                }),
                invalidatesTags: (result, error, arg) => [{type: postCacheTag.type, id: arg}], // will request just post (by id from arg). if we want to get all posts again, should in array add provideTag which in getPosts
                transformResponse: (response: Post) => {
                    console.log('updatePostSuccess')
                    return response
                },
            }
        ),
        addPost: builder.mutation<Post, Partial<Omit<Post,'id'>>>(
            {
                query: (body) => ({
                    url: ``,
                    method: 'POST',
                    body,
                }),
                transformResponse: (response: Post) => {
                    console.log('addPostSuccess')
                    return response
                },
                // manual update cache (not recommend this approach, better use tags)
                async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
                    try {
                        const { data: addedPost } = await queryFulfilled // wait response addPost
                        const patchResult = dispatch(
                            postsApi.util.updateQueryData('getPosts', {count: 5, page: 1}, (draft) => {
                                return [...draft, addedPost]
                            })
                        )
                    } catch {}
                },
            }
        ),
        deletePost: builder.mutation<void, number>(
            {
                query: (id) => ({
                    url: `/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: [postListCacheTag], // will request all posts
                transformResponse: () => {
                    console.log('deletePostSuccess')
                },
            }
        )
    }),
})

export const {useGetPostsQuery, useGetPostQuery, useUpdatePostMutation, useDeletePostMutation} = postsApi

/*
* How work tag invalidation:
* Tags use for call queries after call mutation. For instance, we want get all posts after add new post or update cache in post, after update him.

* 1. if we add ['Post'] or [{type: 'Post'}] in array of invalidatesTags, will call all queries methods where exist type: 'Post' in providesTags
* In this case will call all queries, because all contain type : [{type: 'Post, id: 1}], [{type: 'Post, id: 'List}], [{type: 'Post}]
*
* 2. if we add [{type: 'Post', id: '1'}] in array of invalidatesTags, will call all queries methods where exist type the same tag in providesTags
* Example with queries which will fired: [{type: 'Post, id: 1}], [{type: 'Post, id: 1}, {type: 'Post, id: 'List'}]
* Example with queries which will not fired: [{type: 'Post, id: 'List'}], [{type: 'Post, id: '2'}]
* */

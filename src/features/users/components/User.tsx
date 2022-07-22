import {useGetUserByIdQuery} from '../redux/service'

export const User = () => {
    const query = useGetUserByIdQuery('1', {
        skip: false, // Allows a query to 'skip' running for that render.
        pollingInterval: 0, // Allows a query to automatically refetch on a provided interval in milliseconds. Defaults to 0 (off)
        refetchOnMountOrArgChange: 2000, //  Allows forcing the query to refetch on mount (when true is provided).
        // Allows forcing the query to refetch if enough time (in seconds) has passed since the last query for the same cache (when a number is provided).
        // Defaults to false
        refetchOnFocus: true, // Allows forcing the query to refetch when the browser window regains focus. Defaults to false
        refetchOnReconnect: true,
        // selectFromResult see example in Users component
    })

    const {data, status, error, isUninitialized, isLoading, isFetching, isSuccess, isError, refetch} = query

    return (
        <>
            <p>useful params</p>
            <ul>
                <li>data - The latest returned result regardless of hook arg, if present</li>
                <li>status - The same like in toolkit</li>
                <li>error - The error result if present</li>
                <li>isUninitialized - When true, indicates that the query has not started yet.</li>
                <li>isLoading - When true, indicates that the query is currently loading for the first time,
                    and has no data yet. This will be true for the first request fired off, but not for subsequent requests.</li>
                <li>isFetching - When true, indicates that the query is currently fetching, but might have data from an earlier request.
                    This will be true for both the first request fired off, as well as subsequent requests.</li>
                <li>isSuccess - When true, indicates that the query has data from a successful request.</li>
                <li>isError - When true, indicates that the query is in an error state.</li>
                <li>refetch - A function to force refetch the query.</li>
            </ul>
        </>
    )
}

import {useGetUserByIdQuery, usersApi} from '../redux/service'
import {useDispatch} from "react-redux";

export const UserWithCache = () => {
    return <>
        <ComponentOne/>
        <ComponentTwo/>
        <ComponentThree/>
        <ComponentFour/>
        <ComponentFive/>
    </>
}

/*Cache flow:
* 1. RTK create cache for each uniq subscription (url + query).
* here will be created cache for request: user/1, user/2, user/3
* 2.1 Example for component one (because only 1 subscription):
* If component one will be unmounted, cache will store for next 60 second and then if will not other subscriptions, will be removed.
* we can change time during will store cache (60 second by default). in redux service we can use keepUnusedDataFor key
* 2.2 Example with several subscriptions:
* If component two will be unmounted, cash will be saved because component three has subscription.
* If then component three will be unmounted, see 2.1
*
* Extra info: all subscriptions we can get from state. in our case: state.userApi.subscriptions
*  */

function ComponentOne() {
    // component subscribes to the data
    const { data } = useGetUserByIdQuery('1')

    return null
}

function ComponentTwo() {
    // component subscribes to the data
    const { data } = useGetUserByIdQuery('2')

    return null
}

function ComponentThree() {
    // component subscribes to the *same* data as ComponentThree,
    // as it has the same query parameters
    const { data } = useGetUserByIdQuery('2')

    return null
}

// example how Re-fetching on demand with refetch/initiate
function ComponentFour() {
    // component subscribes to the *same* data as ComponentThree,
    // as it has the same query parameters
    const userId = '3';
    const { data, refetch } = useGetUserByIdQuery(userId)
    const dispatch = useDispatch()

    function handleRefetchOne() {
        // force re-fetches the data
        refetch()
    }

    function handleRefetchTwo() {
        // has the same effect as `refetch` for the associated query
        dispatch(
            usersApi.endpoints.getUserById.initiate(
                userId,
                { subscribe: false, forceRefetch: true }
            )
        )
    }

    return null
}

// example how Re-fetching with extra options (not need use all, we can use some of them)
function ComponentFive() {
    // component subscribes to the *same* data as ComponentThree,
    // as it has the same query parameters
    const { data } = useGetUserByIdQuery('4', {
        refetchOnMountOrArgChange: true, // refetch when component mounted or props were changed
        refetchOnFocus: true, // additional fetch when window regains focus (need add setupListeners), skip should be false here. For example switch between tabs or windows. When we get back to our page, will be request
        refetchOnReconnect: true // additional fetch when reconnect
    })

    return null
}



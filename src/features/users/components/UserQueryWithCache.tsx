import { useGetUserByIdQuery, usersApi } from '../redux/service'
import { useDispatch } from 'react-redux'

export const UserQueryWithCache = () => {
  return <>
    <User id='1' /> {/*component subscribes to the data*/}
    <User id='2' /> {/*component subscribes to the data*/}
    <User id='2' /> {/*component subscribes to the *same* data because data with the same query parameters recieved. Request didn't send, data took from cash*/}
    <RefetchUserOnDemand /> {/* if we need fetch data and not take data from cash */}
    <RefetchUserWithUsingExtraOptions /> {/* if we want fetch data when changed props, reconnect or on focus */}
  </>
}

/* Cache flow:
* 1. RTK create cache for each uniq subscription (url + query).
* here will be created cache for request: user/1, user/2, user/3, user/4
* 2.1 Example for component one (because only 1 subscription):
* If component one will be unmounted, cache will store for next 60 second and then if will not other subscriptions, will be removed.
* we can change time during will store cache (60 second by default). in redux service we can use keepUnusedDataFor key
* 2.2 Example with several subscriptions:
* If component one will be unmounted, cash will be saved because component two has subscription.
* If then component two will be unmounted, see 2.1
*
* Extra info: all subscriptions we can get from state. in our case: state.userApi.subscriptions
*  */

function User({ id }: { id: string }) {
  // component subscribes to the data
  const { data } = useGetUserByIdQuery(id)

  return null
}

// example how Re-fetching on demand with refetch/initiate
function RefetchUserOnDemand() {
  // component subscribes to the *same* data as ComponentThree,
  // as it has the same query parameters
  const userId = '3'
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
        { subscribe: false, forceRefetch: true },
      ),
    )
  }

  return null
}

// example how Re-fetching with extra options (not need use all, we can use some of them)
function RefetchUserWithUsingExtraOptions() {
  // component subscribes to the *same* data as ComponentThree,
  // as it has the same query parameters
  const { data } = useGetUserByIdQuery('4', {
    refetchOnMountOrArgChange: true, // refetch when component mounted or props were changed
    refetchOnFocus: true, // additional fetch when window regains focus (need add setupListeners), skip should be false here. For example switch between tabs or windows. When we get back to our page, will be request
    refetchOnReconnect: true, // additional fetch when reconnect
  })

  return null
}



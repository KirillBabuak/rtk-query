import { useGetAllUsersQuery } from '../redux/service'

export const Users = () => {
  const { data, error, isLoading } = useGetAllUsersQuery()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>ERROR</p>
  }

  return (
    <>
      <p>Count users: {data?.length}</p>
    </>
  )
}

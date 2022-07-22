import { useGetUserByIdQuery } from '../redux/service'

export const User = () => {
  const { data, error, isLoading } = useGetUserByIdQuery('1')

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>ERROR</p>
  }

  return (
    <>
      <p>User: {JSON.stringify(data)}</p>
    </>
  )
}

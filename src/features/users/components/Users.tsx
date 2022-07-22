import {useGetAllUsersQuery} from '../redux/service'

export const Users = () => {
    const {data, error, isLoading} = useGetAllUsersQuery()

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>ERROR</p>
    }

    return (
        <>
            <p>Count users: {data?.length}</p>
            <User id='1'/>
        </>
    )
}

const User = ({id}: { id: string }) => {
    const {user} = useGetAllUsersQuery(undefined, {
        selectFromResult: ({data}) => {
            return {
                user: data?.find((user: any) => user.id === id),
            }
        },
    })

    return null
}

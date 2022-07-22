import {useUpdateUserMutation, useGetUserByIdQuery} from '../redux/service'

export const UpdateUser = () => {
    const {data: defaultUser} = useGetUserByIdQuery('1');
    const mutation = useUpdateUserMutation();
    const [updateUser, result] = mutation;
    const {data: mutationUser, error, isUninitialized, isLoading, isSuccess, isError} = result;

    const handleUpdate = async () => {
        const response =await updateUser({id: '1', name: 'testName'})
    }

    return <>
        ___________________________________________________
        mutation user
        <div>{mutationUser?.name || defaultUser?.name}</div>
        <button onClick={handleUpdate}>update user name</button>
    </>
}

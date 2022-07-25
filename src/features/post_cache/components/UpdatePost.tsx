import {useUpdatePostMutation} from "../redux/service";

export const UpdatePost = () =>{
    const [updatePost] = useUpdatePostMutation();

    const handlePostUpdate = ()=> {
        const postId = prompt('please, enter post id', '1')

        updatePost({id: Number(postId), name: 'newName'})
    }

    return <button onClick={handlePostUpdate}> update post </button>
}
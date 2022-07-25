import {useDeletePostMutation} from "../redux/service";

export const DeletePost = () =>{
    const [deletePost] = useDeletePostMutation();

    const handlePostDelete = ()=> {
        const postId = prompt('please, enter post id', '1')

        deletePost(Number(postId))
    }

    return <button onClick={handlePostDelete}> delete post </button>
}
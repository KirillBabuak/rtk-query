import {useGetPostQuery} from "../redux/service";

export const Post = ({id}: { id: number }) => {
    const {isFetching, data} = useGetPostQuery(id);

    return <div>
        {isFetching ? `Loading post ${id}...` : <div>
            {data?.id} - {data?.title}
        </div>}
    </div>
}
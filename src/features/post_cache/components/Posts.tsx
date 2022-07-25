import {useGetPostsQuery} from "../redux/service";
import {useState} from "react";

export const Posts = () => {
    const [filter, setFilter] = useState({count: 5, page: 1});
    const {isFetching} = useGetPostsQuery(filter)

    const handleCountChange = (newCount: number) => {
        setFilter(prev => ({...prev, count: newCount, page: 1}))
    }

    const handlePageChange = (newPage: number) => {
        setFilter(prev => ({...prev, page: newPage}))
    }

    return <div>
        {isFetching ? 'Loading ...' : <>
            <button onClick={() => handleCountChange(filter.count + 1)}>increase count elements</button>
            <button onClick={() => handlePageChange(filter.page + 1)}>increase page</button>
        </>}
    </div>
}
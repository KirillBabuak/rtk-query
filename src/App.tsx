import {Users} from './features/users/components/Users'
import {UserQueryWithAllParams} from './features/users/components/UserQueryWithAllParams'
import {UpdateUser} from "./features/users/components/UpdateUser";
import {UserQueryWithCache} from "./features/users/components/UserQueryWithCache";
import {Posts} from "./features/post_cache/components/Posts";
import {UpdatePost} from './features/post_cache/components/UpdatePost';
import {DeletePost} from './features/post_cache/components/DeletePost';
import {Post} from "./features/post_cache/components/Post";

export default function App() {
    return (
        <div>
            <Users/>
            <UserQueryWithAllParams/>
            <UpdateUser/>
            <UserQueryWithCache />
        </div>
        // <div>
        //     <Posts/>
        //     <Post id={1}/>
        //     <Post id={2}/>
        //     <UpdatePost/>
        //     <DeletePost/>
        // </div>
    )
}

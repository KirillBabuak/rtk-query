import {Users} from './features/users/components/Users'
import {User} from './features/users/components/User'
import {UpdateUser} from "./features/users/components/UpdateUser";
import {UserWithCache} from "./features/users/components/UserWithCache";
import {Posts} from "./features/post_cache/components/Posts";
import {UpdatePost} from './features/post_cache/components/UpdatePost';
import {DeletePost} from './features/post_cache/components/DeletePost';
import {Post} from "./features/post_cache/components/Post";

export default function App() {
    return (
        // <div>
        //     <Users/>
        //     <User/>
        //     <UpdateUser/>
        //     <UserWithCache />
        // </div>
        <div>
            <Posts/>
            <Post id={1}/>
            <Post id={2}/>
            <UpdatePost/>
            <DeletePost/>
        </div>
    )
}

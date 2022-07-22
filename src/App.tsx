import {Users} from './features/users/components/Users'
import {User} from './features/users/components/User'
import {UpdateUser} from "./features/users/components/UpdateUser";
import {UserWithCache} from "./features/users/components/UserWithCache";

export default function App() {
    return (
        <div>
            <Users/>
            <User/>
            <UpdateUser/>
            <UserWithCache />
        </div>
    )
}

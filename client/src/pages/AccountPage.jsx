import { UserContext } from "../UserContext.jsx";
import { useContext } from "react";
export default function AccountPage() {

    const {user} = useContext(UserContext);
    return (
        <div>
            <h1>Account page for{user.email}</h1>
        </div>
    )
}
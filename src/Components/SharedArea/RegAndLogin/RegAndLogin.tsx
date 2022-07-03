import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Customer } from "../../../Models/CustomerModel";
import { UserModel } from "../../../Models/UserModel";
import store from "../../../Redux/store";
import CustomLink from "../CustomLink/CustomLink";
import "./RegAndLogin.css";




function RegAndLogin(): JSX.Element {
    const [user, setUser] = useState<UserModel>(store.getState().authReducer.user);

    useEffect(() => {

        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authReducer.user || new UserModel());
        });

        return unsubscribe;
    }, []);
    
    return (
        <div className="RegAndLogin">
            {user?.token ?
                <>
                    <span>{user?.email}</span>
                    &nbsp;
                    <CustomLink to="logout">logout</CustomLink>
                </>
                :
                <>
                    <CustomLink to="register">Register</CustomLink>
                    <CustomLink to="login">Login</CustomLink>
                </>
            }
        </div>
    );
}

export default RegAndLogin;

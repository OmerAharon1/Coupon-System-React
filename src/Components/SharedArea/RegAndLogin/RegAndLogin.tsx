import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Customer } from "../../../Models/CustomerModel";
import store from "../../../Redux/store";
import CustomLink from "../CustomLink/CustomLink";
import "./RegAndLogin.css";




function RegAndLogin(): JSX.Element {
    const [customer, setCustomer] = useState<Customer>(store.getState().customerAuthReduced.customer);

    useEffect(() => {

        const unsubscribe = store.subscribe(() => {
            setCustomer(store.getState().customerAuthReduced?.customer || new Customer());
        });

        return unsubscribe;
    }, []);
    return (
        <div className="RegAndLogin">
            {customer?.token ?
                <>
                    <span>{customer?.email}</span>
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

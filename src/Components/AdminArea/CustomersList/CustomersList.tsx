import { useEffect, useState } from "react";
import { Customer } from "../../../Models/CustomerModel";
import { customersDownloadedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/store";
import Store from "../../../Redux/store";
import { getAllCustomers } from "../../../Services/Api/AdminApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import CustomerCard from "../../SharedArea/CustomerCard/CustomerCard";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./CustomersList.css";

function CustomersList(): JSX.Element {

    const [customers, setCustomers] = useState<Customer[]>(Store.getState().customersReducer.customers);

    useEffect(() => {

        const subscribe = store.subscribe(() => {
            setCustomers(store.getState().customersReducer.customers);
        });
        return subscribe;
    }, []);


    useEffect(() => {
        if (customers.length === 0) {
            getAllCustomers()
                .then((res) => {
                    console.log(res.data);
                    setCustomers(res.data);
                    Store.dispatch(customersDownloadedAction(res.data));
                    notify.success(SccMsg.GOT_CUSTOMERS);
                })
                .catch((err) => {
                    notify.error(err);
                });
        }
    }, []);

    return (
        <div className="CustomersList">
            <button><CustomLink to="oneCustomer">One Customer</CustomLink></button>

            {customers?.map(customer => <CustomerCard key={customer.id} customer={customer} />)}
        </div>
    );
}

export default CustomersList;

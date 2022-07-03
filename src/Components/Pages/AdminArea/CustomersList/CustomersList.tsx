import { useEffect, useState } from "react";
import { Customer } from "../../../Models/CustomerModel";
import { getAllCustomers } from "../../../Services/Api/AdminApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import CustomerCard from "../../SharedArea/CustomerCard/CustomerCard";
import "./CustomersList.css";

function CustomersList(): JSX.Element {

    const [customers, setCustomers] = useState<Customer[]>();


    useEffect(() => {
        getAllCustomers()
            .then((res) => {
                console.log(res.data);
                setCustomers(res.data);
                notify.success(SccMsg.GOT_CUSTOMERS);
            })
            .catch((err) => {
                notify.error(err);
            });

    }, []);

    return (
        <div className="CustomersList">
            {customers?.map(customer => <CustomerCard key={customer.id} customer={customer} />)}
        </div>
    );
}

export default CustomersList;

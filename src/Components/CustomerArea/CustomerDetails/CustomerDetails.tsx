import { useEffect, useState } from "react";
import { Customer } from "../../../Models/CustomerModel";
import store from "../../../Redux/store";
import { getCustomerDetails } from "../../../Services/Api/CustomerApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import CustomerCard from "../../SharedArea/CustomerCard/CustomerCard";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {
 
    const [customer, setCustomer] = useState<Customer>();
    const customerId =store.getState().authReducer.user.id;

    useEffect(() => {
        getCustomerDetails(customerId)
            .then((res) => {
                setCustomer(res.data);
                notify.success(SccMsg.GOT_CUSTOMER);
            })
            .catch((err) => {
                notify.error(err);
            });

    }, []);

    return (
        <div className="CustomersList">
            {<CustomerCard key={customerId} customer={customer} />}
            {customer?.coupons!.length === 0 ?
            <> <h2>you don't own coupons, but you can but them at the Coupons Store or at the link below</h2>  {<br/>}
            {< CustomLink to={"coupons"}>Coupon Store</CustomLink> }  </>
            :
            <></>}

        </div>
    );
}

export default CustomerDetails;

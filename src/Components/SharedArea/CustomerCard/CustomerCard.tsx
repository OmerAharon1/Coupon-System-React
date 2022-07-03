import { FaTrash, FaEdit } from "react-icons/fa";
import { Customer } from "../../../Models/CustomerModel";
import store from "../../../Redux/store";
import CustomLink from "../CustomLink/CustomLink";
import ProductCard from "../ProductCard/ProductCard";
import "./CustomerCard.css";
interface CustomerCardProps {
    customer?: Customer;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
    return (
        <div className="CustomerCard">
            {store.getState().authReducer.user.clientType === "ADMINISTRATOR" ? <><CustomLink to={"/adminDashboard/customersList/deleteCustomer/" + props.customer?.id}><FaTrash /></CustomLink>
                <br />
                <CustomLink to={"updateCustomer/" + props.customer?.id}><FaEdit /></CustomLink>
            </>

                : <></>}

            <h4><b>{props.customer?.firstName} {props.customer?.lastName}</b></h4>
            <p>Email: {props.customer?.email}</p>
            <p>Current Id: {props.customer?.id}</p>
            <ul>Owned Coupons:
                {props.customer?.coupons?.map(coupon => <ProductCard key={coupon.id} coupon={coupon} />)}


            </ul>


        </div>
    );
}

export default CustomerCard;

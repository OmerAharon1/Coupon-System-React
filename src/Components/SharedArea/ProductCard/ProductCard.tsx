import { Coupon } from "../../../Models/CouponModel";
import { Customer } from "../../../Models/CustomerModel";
import { purchaseCoupon } from "../../../Services/Api/CustomerApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import ILDate from "../ILDate/ILDate";
import "./ProductCard.css";
import { FaCashRegister } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface ProductCardProps {
    coupon: Coupon;
    customer: Customer;
}

function ProductCard(props: ProductCardProps): JSX.Element {
    const params = useParams();
    console.log(params);
    const purchase = () => {
        purchaseCoupon(props.coupon.id || 0, props.customer)
            .then(res => {
                notify.success(SccMsg.COUPON_PURCHASE)
            })
            .catch(err => notify.error(ErrMsg.ALREADY_PURCHASED));
    }
    return (
        <div className="ProductCard">
            <p>id: {props.coupon.id} </p>
            <img src="https://picsum.photos/id/424/200/300" alt="" />
            <h1> {props.coupon.title} </h1>
            <p className="price">Price: {props.coupon.price} </p>
            <p>Description: {props.coupon.description} </p>
            <p>Exp: <ILDate date={props.coupon.endDate || new Date()} /></p>
            <p><button onClick={purchase}><FaCashRegister /></button></p>
        </div>
    );
}

export default ProductCard;

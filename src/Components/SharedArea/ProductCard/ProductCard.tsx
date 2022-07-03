import { useState } from "react";
import { FaCashRegister } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Coupon } from "../../../Models/CouponModel";
import { couponDeletedAction, couponUpdatedAction } from "../../../Redux/CouponsAppState";
import Store from "../../../Redux/store";
import store from "../../../Redux/store";
import { deleteCoupon } from "../../../Services/Api/CompanyApi";
import { getOneCoupon, purchaseCoupon } from "../../../Services/Api/CustomerApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import ILDate from "../ILDate/ILDate";
import "./ProductCard.css";

interface ProductCardProps {
    coupon: Coupon;
}

function ProductCard(props: ProductCardProps): JSX.Element {

    const params = useParams();

    const navigate = useNavigate();
    const [coupon,setCoupon] = useState<Coupon>();




    const purchase = () => {
        if (!store.getState().authReducer.user.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login')
            
        }else{
            if(store.getState().authReducer.user.clientType === "CUSTOMER"){
                purchaseCoupon(store.getState().authReducer.user.id, props.coupon)
                    .then(res => {
                        notify.success(SccMsg.COUPON_PURCHASE)
                        setCoupon(res.data)
                        store.dispatch(couponUpdatedAction(res.data))
                        
                    })
                    .catch(err => {
                        notify.error(ErrMsg.ALREADY_PURCHASED)
                    })
            }else {
                notify.error(ErrMsg.NOT_AUTHORIZED)

            }
        }
    }
    



    return (
        <div className="Container">
            <div className="ProductCard">
                <p>id: {props.coupon.id} </p>
                <img src="https://picsum.photos/id/424/200/300" alt="" />
                <h1> {props.coupon.title} </h1>
                <p className="companyId">Company Id: {props.coupon.companyId} </p>
                <p className="amount">Amount left: {props.coupon.amount} </p>
                <p className="price">Price: {props.coupon.price} </p>
                <p>Description: {props.coupon.description} </p>
                <p>Exp: <ILDate date={props.coupon.endDate || new Date()} /></p>
                <p><button onClick={purchase}><FaCashRegister /></button></p>

            </div>

        </div>
    );
}

export default ProductCard;

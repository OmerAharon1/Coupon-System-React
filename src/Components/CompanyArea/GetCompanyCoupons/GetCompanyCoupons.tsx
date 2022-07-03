import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Coupon } from "../../../Models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/store";
import { getAllCoupons } from "../../../Services/Api/CustomerApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import ProductCard from "../../SharedArea/ProductCard/ProductCard";
import "./GetCompanyCoupons.css";

function GetCompanyCoupons(): JSX.Element {

    const navigate = useNavigate();

    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponsReducer.coupons);
    const params = useParams();
    const id = +(params.id || '');


    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user.token) {
            notify.error(ErrMsg.LOGIN_REQUIRED);
            navigate('/login');
        }
    },[])


    return (
        <div className="CouponList">
            <ul>
            <CustomLink to="addCoupon/">addCoupon</CustomLink>
                {coupons.filter(c => c.companyId === store.getState().authReducer.user.id).map(coupon => <ProductCard key={coupon.id} coupon={coupon}   />)}
                {/* {coupons.map(coupon => <ProductCard key={coupon.id} coupon={coupon}   />)} */}
            </ul>

        </div>
    );

}
export default GetCompanyCoupons;

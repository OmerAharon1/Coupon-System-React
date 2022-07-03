import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Coupon } from "../../../Models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/store";
import { getCustomerCoupons } from "../../../Services/Api/CustomerApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import ProductCard from "../../SharedArea/ProductCard/ProductCard";
import "./CouponByCategory.css";

function CouponByCategory(): JSX.Element {

    const navigate = useNavigate();

    const [coupons, setCoupons] = useState<Coupon[]>();
    const params = useParams();
    const id = +(params.id || '');


    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user.token) {
            notify.error(ErrMsg.LOGIN_REQUIRED);
            navigate('/login');
        }
    },[])

    

    useEffect(() => {
        if(coupons?.length ===0){
            getCustomerCoupons(store.getState().authReducer.user.id)
            .then((res) => {
                console.log(res.data)
                //Update Component State
                setCoupons(res.data);
                //Update Application State
                store.dispatch(couponsDownloadedAction(res.data));
                notify.success(SccMsg.GOT_COUPONS);
            })
            .catch((err) => { notify.error(err); });
        }

    }, []);



    return (
        <div className="CouponList">
            <ul>
                <h1>Customer email: {store.getState().authReducer.user.email}</h1>
                {coupons?.map(coupon => <ProductCard key={coupon.id} coupon={coupon}   />)}
            </ul>

        </div>
    );

}
export default CouponByCategory;

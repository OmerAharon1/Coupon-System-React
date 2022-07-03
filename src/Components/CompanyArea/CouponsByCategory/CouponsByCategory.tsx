import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Coupon } from "../../../Models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/store";
import { getAllCoupons } from "../../../Services/Api/CustomerApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import ProductCard from "../../SharedArea/ProductCard/ProductCard";
import "./CouponsByCategory.css";

interface CouponsCategory {
    category: string;
}
function CouponsByCategory(props: CouponsCategory): JSX.Element {

    const navigate = useNavigate();

    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponsReducer.coupons);
    const params = useParams();
    const id = +(params.id || '');


    // useEffect(() => {
    //     // If we don't have a user object - we are not logged in
    //     if (!store.getState().authReducer.user.token) {
    //         notify.error(ErrMsg.LOGIN_REQUIRED);
    //         navigate('/login');
    //     }
    // }, [])

    useEffect(() => {
        if (coupons?.length === 0) {
            getAllCoupons()
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
                <CustomLink to="addCoupon/">addCoupon</CustomLink>

                {coupons.filter(c => c.companyId === store.getState().authReducer.user.id).filter(c => c.category === props.category).length} !== 0
                ?{coupons.filter(c => c.companyId === store.getState().authReducer.user.id).filter(c => c.category === props.category).map(coupon => <ProductCard key={coupon.id} coupon={coupon} />)}
                :<h1> CouponS of {props.category} Not available  </h1>

            </ul>

        </div>
    );

}
export default CouponsByCategory;

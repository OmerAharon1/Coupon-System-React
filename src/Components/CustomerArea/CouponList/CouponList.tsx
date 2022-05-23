import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Coupon } from "../../../Models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/store";
import { getAvailAbleCoupons } from "../../../Services/Api/CustomerApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import ProductCard from "../../SharedArea/ProductCard/ProductCard";


function CouponList(): JSX.Element {

    const navigate = useNavigate();

    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponsReducer.coupons);
    const params = useParams();
    const id = +(params.id || '');

    useEffect(() => {
        if(coupons?.length ===0){
            getAvailAbleCoupons(id)
            .then((res) => {
                console.log(id)
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
            <CustomLink to="addCoupon/add">addCoupon</CustomLink>
                {coupons.map(coupon => <ProductCard key={coupon.id} coupon={coupon} customer={undefined} />)}
            </ul>

        </div>
    );

}

export default CouponList;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Company } from "../../../Models/CompanyModel";
import { Coupon } from "../../../Models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/store";
import Store from "../../../Redux/store";
import { getCompanyDetails } from "../../../Services/Api/CompanyApi";
import { getAllCoupons } from "../../../Services/Api/CustomerApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import ProfileCard from "../../SharedArea/ProfileCard/ProfileCard";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {
    const [company, setCompany] = useState<Company>();
    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponsReducer.coupons);

    // const navigate = useNavigate();

    useEffect(() => {
        if(coupons?.length ===0){
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


    
    // const params = useParams();
    // const id = +(params.id || '');


    // useEffect(() => {
    //     // If we don't have a user object - we are not logged in
    //     if (!store.getState().authReducer.user.token) {
    //         notify.error(ErrMsg.LOGIN_REQUIRED);
    //         navigate('/login');
    //     
    //

    
    useEffect(() => {

        getCompanyDetails(Store.getState().authReducer.user.id)
            .then((res) => {
                console.log(res.data)
                setCompany(res.data)
                //Update Component State
                //Update Application State
                notify.success(SccMsg.REQUEST_SUCCESS);
            })
            .catch((err) => { notify.error(err); });

    }, []);


    
    return (
        <div className="CouponList">
            <ul>
                <CustomLink to="addCoupon">addCoupon</CustomLink>
                {<ProfileCard company={company} />}

            </ul>

        </div>
    );

}

export default CompanyDetails;

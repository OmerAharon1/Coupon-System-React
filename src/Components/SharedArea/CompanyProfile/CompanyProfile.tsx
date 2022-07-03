import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Coupon } from "../../../Models/CouponModel";
import Store from "../../../Redux/store";
import CustomLink from "../CustomLink/CustomLink";
import ILDate from "../ILDate/ILDate";
import "./CompanyProfile.css";

interface CompanyProfileProps {
    coupon: Coupon;
}

function CompanyProfile(props: CompanyProfileProps): JSX.Element {
    const params = useParams();
    let couponId = props.coupon.id



             return (
        <div className="Container">
            <div className="ProductCard">
                <p>id: {props.coupon.id} </p>
                <img src="https://picsum.photos/id/424/200/300" alt="" />
                <h1> {props.coupon.title} </h1>
                <p className="companyId">Company Id: {props.coupon.companyId} </p>
                <p className="price">Price: {props.coupon.price} </p>
                <p>Description: {props.coupon.description} </p>
                <p>Exp: <ILDate date={props.coupon.endDate || new Date()} /></p>
                <p><CustomLink to={"updateCoupon/" + couponId} > <FaEdit color="white" /> </CustomLink></p>
                <p><CustomLink to={"/coupons/delete/" + props.coupon.id}><FaTrash color="white" /></CustomLink></p>

            </div>

        </div>
    );
}

export default CompanyProfile;

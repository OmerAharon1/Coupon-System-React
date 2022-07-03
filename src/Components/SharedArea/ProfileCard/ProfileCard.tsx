import { Company } from "../../../Models/CompanyModel";
import { Customer } from "../../../Models/CustomerModel";
import ProductCard from "../ProductCard/ProductCard";
import "./ProfileCard.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import CustomLink from "../CustomLink/CustomLink";
import { deleteCompany } from "../../../Services/Api/AdminApi";
import CompanyProfile from "../CompanyProfile/CompanyProfile";
import { useEffect } from "react";
import store from "../../../Redux/store";

interface ProfileCard {
    company?: Company;
}

function ProfileCard(props: ProfileCard): JSX.Element {

    useEffect(() => {

        const unsubscribe = store.subscribe(() => {

        });

        return unsubscribe;
    }, []);


    return (
        <div className="card">
            <div className="container">
                {store.getState().authReducer.user.clientType === "ADMINISTRATOR" ? <><CustomLink to={"/adminDashboard/companiesList/deleteCompany/" + props.company?.id}><FaTrash /></CustomLink>
                    <br />
                    <CustomLink to={"/adminDashboard/companiesList/updateCompany/" + props.company?.id}><FaEdit /></CustomLink>
                </>
                    : <></>}
                <h4><b>{props.company?.name}</b></h4>
                <p>Email: {props.company?.email}</p>
                <p>Current Id: {props.company?.id}</p>
                <ul>Owned Coupons: {props.company?.coupons?.map(coupon => <CompanyProfile key={coupon.id} coupon={coupon} />)}</ul>



            </div>
        </div>
    );
}

export default ProfileCard;

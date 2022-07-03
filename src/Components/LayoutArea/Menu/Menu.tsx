import { render } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import store from "../../../Redux/store";
import Store from "../../../Redux/store";
import CouponList from "../../CustomerArea/CouponList/CouponList";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./Menu.css";

function Menu(): JSX.Element {
    const [user, setUser] = useState<UserModel>(store.getState().authReducer.user);

    useEffect(() => {

        const subscribe = store.subscribe(() => {
            setUser(store.getState().authReducer.user || new UserModel());
        });

        return subscribe;
    }, []);


    return (
        <div className="Menu">
            <ul>
                <li><CustomLink to="home">Home</CustomLink></li>
                <li><CustomLink to="about">About</CustomLink></li>
                <li><CustomLink to="credits">Credits</CustomLink></li>
                <li><CustomLink to="coupons">Coupons Store</CustomLink></li>


                {store.getState().authReducer.user.clientType === "COMPANY" ?
                    <>
                        <li><CustomLink to="companyDetails">Profile</CustomLink></li>
                        <li className="dropdown">
                            <a href="#" className="dropbtn">Coupons Category</a>
                            <div className="dropdown-content">
                                <CustomLink to="couponsByHome">Home</CustomLink>
                                <CustomLink to="couponsByFood">Food</CustomLink>
                                <CustomLink to="couponsByGaming">Gaming</CustomLink>
                            </div>
                        </li>
                    </>
                    : <></>}

                {store.getState().authReducer.user.clientType === "ADMINISTRATOR" ?
                    <>
                        <li><CustomLink to="adminDashboard">AdminDashBoard</CustomLink></li>

                    </>
                    : <></>}

                {store.getState().authReducer.user.clientType === "CUSTOMER" ?
                    <>
                                <li><CustomLink to="customerDetails">My Profile</CustomLink></li>


                    </>
                    : <></>}






            </ul>


        </div>
    );
}

export default Menu;

import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import Main from "../../LayoutArea/Main/Main";
import About from "../About/About";
import CouponList from "../../CustomerArea/CouponList/CouponList";
import Credits from "../Credits/Credits";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Page404 from "../Page404/Page404";
import Register from "../Register/Register";
import "./Routing.css";
import Logout from "../Logout/Logout";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>

                <Route path="/" element={<App />} />

                <Route path="/home" element={<Home />} />

                <Route index element={<Home />} />

                <Route path="/coupons" element={<CouponList />} />

                <Route path="/about" element={<About />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/credits" element={<Credits />} />

                <Route path="/logout" element={<Logout />} />

                <Route path="/coupons/addCoupon/add" element={<AddCoupon />} />


                <Route path="*" element={<Page404 />} />

            </Routes>
        </div>
    );
}

export default Routing;

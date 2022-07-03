import { Route, Routes } from "react-router-dom";
import App from "../../../App";
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
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import DeleteCoupon from "../../CompanyArea/DeleteCoupon/DeleteCoupon";
import GetCompanyCoupons from "../../CompanyArea/GetCompanyCoupons/GetCompanyCoupons";
import CouponsByCategory from "../../CompanyArea/CouponsByCategory/CouponsByCategory";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import DeleteCompany from "../../AdminArea/DeleteCompany/DeleteCompany";
import CompaniesList from "../../AdminArea/CompaniesList/CompaniesList";
import CustomersList from "../../AdminArea/CustomersList/CustomersList";
import OneCustomer from "../../AdminArea/OneCustomer/OneCustomer";
import DeleteCustomer from "../../AdminArea/DeleteCustomer/DeleteCustomer";
import CustomerCoupons from "../../CustomerArea/CustomerCoupons/CustomerCoupons";
import CustomerDetails from "../../CustomerArea/CustomerDetails/CustomerDetails";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import OneCompany from "../../AdminArea/OneCompany/OneCompany";

function Routing(this: any): JSX.Element {
    return (
        <div className="Routing">
            <Routes>

                <Route path="/" element={<App />} />

                <Route path="/home" element={<Home />} />

                <Route index element={<Home />} />

                <Route path="/about" element={<About />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/credits" element={<Credits />} />

                <Route path="/logout" element={<Logout />} />

                <Route path="*" element={<Page404 />} />


                {/* customer path */}

                <Route path="/coupons" element={<CouponList />} />

                <Route path="/customerCoupons" element={<CustomerCoupons />} />

                <Route path="/customerDetails" element={<CustomerDetails />} />

                <Route path="/customerDetails/coupons" element={<CouponList />} />




                {/* company  path */}

                <Route path="/companyCoupons" element={<GetCompanyCoupons />} />

                <Route path="/companyDetails/addCoupon" element={<AddCoupon />} />

                <Route path="/coupons/updateCoupon/:couponId" element={<UpdateCoupon/>} />

                <Route path="/companyDetails/updateCoupon/:couponId" element={<UpdateCoupon /> } />

                <Route path="/companyDetails" element={<CompanyDetails />} />

                <Route path="/coupons/delete/:id" element={<DeleteCoupon />} />

                <Route path="/couponsByFood" element={<CouponsByCategory category={"FOOD"} />} />

                <Route path="/couponsByGaming" element={<CouponsByCategory category={"GAMING"} />} />

                <Route path="/couponsByHome" element={<CouponsByCategory category={"HOME"} />} />

                {/* admin  path */}

                <Route path="/adminDashboard/companiesList" element={<CompaniesList />} />

                <Route path="/adminDashboard/addCompany" element={<AddCompany />} />

                <Route path="/adminDashboard/companiesList/OneCompany" element={<OneCompany />} />

                <Route path="/adminDashboard" element={<AdminDashboard />} />

                <Route path="/adminDashboard/companiesList/updateCompany/:companyId" element={<UpdateCompany />} />



                <Route path="/adminDashboard/customersList/" element={<CustomersList />} />

                <Route path="/adminDashboard/customersList/deleteCustomer/:id" element={<DeleteCustomer />} />

                <Route path="/adminDashboard/customersList/updateCustomer/:customerId" element={<UpdateCustomer />} />

                <Route path="/adminDashboard/customersList/oneCustomer/" element={<OneCustomer />} />

                <Route path="/adminDashboard/oneCustomer/updateCustomer/:customerId" element={<UpdateCustomer />} />


                {/* <Route path="/adminDashboard/getCompany/" element={<GetCompany />} /> */}


            </Routes>
        </div>
    );
}

export default Routing;

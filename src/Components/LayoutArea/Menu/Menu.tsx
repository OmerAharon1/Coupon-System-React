import { Link } from "react-router-dom";
import CouponList from "../../CustomerArea/CouponList/CouponList";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
		<ul>
            <li><CustomLink to="home">Home</CustomLink></li>
            <li><CustomLink to="about">About</CustomLink></li>
            <li><CustomLink to="credits">Credits</CustomLink></li>
            <li><CustomLink to="coupons">Coupons Store</CustomLink></li>
            <li className="dropdown">
            <a href="#" className="dropbtn">Dropdown</a>

            <div className="dropdown-content">
                <CustomLink to="coupons">Coupons Store</CustomLink>
                <CustomLink to="#">link</CustomLink>
                <CustomLink to="#">link</CustomLink>
        </div>
    </li>
</ul>


        </div>
    );
}

export default Menu;

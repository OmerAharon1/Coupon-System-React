import RegAndLogin from "../../SharedArea/RegAndLogin/RegAndLogin";
import Logo from "../../SharedArea/Logo/Logo";
import Total from "../../SharedArea/Total/Total";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <Logo/>
            <h1>Coupon System</h1>
			<RegAndLogin/>
        </div>
    );
}

export default Header;

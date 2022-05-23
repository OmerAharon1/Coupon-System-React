import "./Logo.css";
import logo from '../../../Assets/Img/coupon.png';

function Logo(): JSX.Element {
    return (
        <div className="Logo">
            <img src={logo} alt=""/>
        </div>
    );
}

export default Logo;

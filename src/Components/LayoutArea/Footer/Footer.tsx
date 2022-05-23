import Clock from "../../SharedArea/Clock/Clock";
import Logo from "../../SharedArea/Logo/Logo";
import SocialMedia from "../../SharedArea/SocialMedia/SocialMedia";
import "./Footer.css";
function Footer(): JSX.Element {
    return (
        <div className="Footer">

            <SocialMedia/>

            <p>All rights reserved to Omer &copy;</p>

            <Clock/>
            
        </div>
    );
}

export default Footer;

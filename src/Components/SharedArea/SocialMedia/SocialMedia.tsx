import "./SocialMedia.css";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaYoutube ,FaLinkedin} from 'react-icons/fa';
import { Link } from "react-router-dom";


function SocialMedia(): JSX.Element {


    return (
        <div className="SocialMedia">
            <a href="https://www.linkedin.com/in/omer-aharon-6698401b3/">            
            <FaLinkedin className="image-distance" color="white" size={33} />
            </a>
            <a href="https://github.com/OmerAharon1">            
            <FaGithub className="image-distance" color="white" size={33} />
            </a>
        </div>
    );
}

export default SocialMedia;

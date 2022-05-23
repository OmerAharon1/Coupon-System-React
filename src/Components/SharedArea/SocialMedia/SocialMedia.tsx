import "./SocialMedia.css";
import { FaFacebook , FaInstagram , FaTwitter , FaGithub ,FaYoutube } from 'react-icons/fa';


function SocialMedia(): JSX.Element {
    return (
        <div className="SocialMedia">
			<FaFacebook className="image-distance" size={33} />
            <FaInstagram className="image-distance" size={33}/>
            <FaTwitter className="image-distance" size={33}/>
            <FaGithub className="image-distance" size={33}/>
            <FaYoutube className="image-distance" size={33}/>
        </div>
    );
}

export default SocialMedia;

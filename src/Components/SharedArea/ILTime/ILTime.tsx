import "./ILTime.css";
import moment from "moment";

interface ILTimeProps {
    date:Date;
}

function ILTime(props:ILTimeProps): JSX.Element {
    return (
        <div className="ILTime">
			{moment(props.date).format('hh:mm:ss')};
        </div>
    );
}

export default ILTime;

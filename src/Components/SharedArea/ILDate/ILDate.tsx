import "./ILDate.css";
import moment from "moment";
interface ILDateProps {
    date: Date;
}
function ILDate(props: ILDateProps): JSX.Element {
    return (
        <span> {moment(props.date).format('DD/MM/yyyy')} </span>
    );
}

export default ILDate;


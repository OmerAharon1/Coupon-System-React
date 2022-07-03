import { useNavigate, useParams } from "react-router-dom";
import { customerDeletedAction } from "../../../Redux/CustomerAppState";
import Store from "../../../Redux/store";
import { deleteCustomer } from "../../../Services/Api/AdminApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {

    // const [companyId, setCompanyId] = useState<number>();
    const params =useParams()
    const id = +(params.id || 0)


    const navigate = useNavigate();



    const yes = () => {
        deleteCustomer(id)
            .then(res => {
                notify.success(SccMsg.DELETE_CUSTOMER);

                // Updating global state
                navigate('/adminDashboard');
                Store.dispatch(customerDeletedAction(id))
            })
            .catch(err => notify.error(err));
    }

    const no = () => {
        navigate('/tasks');
    }

    return (
        <div className="DeleteTodo">
            <div className="box">
                <h2>Delete Task</h2>
                <p> would you like to delete company id = {id}</p>
                                <div className="one-line">
                    <button className="button-app-danger" onClick={yes}>Yes</button>
                    <button className="button-app-default" onClick={no}>No</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCustomer;

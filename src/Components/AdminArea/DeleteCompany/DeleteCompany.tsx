import { useNavigate, useParams } from "react-router-dom";
import { couponDeletedAction } from "../../../Redux/CouponsAppState";
import Store from "../../../Redux/store";
import { deleteCompany } from "../../../Services/Api/AdminApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import "./DeleteCompany.css";


// interface DeleteCompanyProps{
//     companyId: number;
// }

function DeleteCompany(): JSX.Element {

    // const [companyId, setCompanyId] = useState<number>();
    const params = useParams()
    const companyId = +(params.companyId || 0)


    const navigate = useNavigate();



    const yes = () => {
        deleteCompany(companyId)
            .then(any => {
                notify.success(SccMsg.DELETED_COMPANY);

                // Updating global state
                Store.dispatch(couponDeletedAction(companyId))
                navigate('/adminDashboard');
            })
            .catch(err => notify.error(err));
            console.log(companyId)

    }

    const no = () => {
        navigate('/tasks');
    }

    return (
        <div className="DeleteTodo">
            <div className="box">
                <h2>Delete Task</h2>
                <p> would you like to delete company id = {companyId}</p>
                <div className="one-line">
                    <button className="button-app-danger" onClick={yes}>Yes</button>
                    <button className="button-app-default" onClick={no}>No</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCompany;

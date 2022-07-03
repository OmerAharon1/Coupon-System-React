import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { couponDeletedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/store";
import { deleteCoupon } from "../../../Services/Api/CompanyApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);



    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authReducer.user.token) {
            console.log(store.getState().authReducer.user);
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    },[])


    const yes = () => {
        deleteCoupon(id)
            .then(any => {
                notify.success(SccMsg.DELETED_TASK);
                // Updating global state
                store.dispatch(couponDeletedAction(id));
                navigate('/coupons');
            })
            .catch(err => notify.error(err));
    }

    const no = () => {
        navigate('/coupons');
    }

    return (
        <div className="DeleteTodo">
            <div className="box">
                <h2>Delete Coupon</h2>
                <p>Are you sure you want to delete Coupon id={id}?</p>
                <div className="one-line">
                    <button className="button-app-danger" onClick={yes}>Yes</button>
                    <button className="button-app-default" onClick={no}>No</button>
                </div>
            </div>
        </div>
    );
}


export default DeleteCoupon;
function taskDeletedAction(id: number): any {
    throw new Error("Function not implemented.");
}


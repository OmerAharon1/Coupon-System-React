import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../Redux/AuthAppState";
import { couponsClearAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/store";
// import { logout } from "../../../Services/Api/UserApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import "./Logout.css";

function Logout(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        store.dispatch(logoutAction())
        store.dispatch(couponsClearAction());
        navigate("/home");
        // logout(store.getState().authReducer.user.token); 


    });

    // const receivedLoginIns)fo = async () => {
    //     logout(store.getState().authReducer.user.token)
    //         .then((re {=> 
    //             notify.success(SccMsg.LOGOUT_SUCCESS);
    //             store.dispatch(logoutAction());
    //             store.dispatch(couponsClearAction());
    //             navigate("/home");
                
    //             // store.dispatch
    //         })
    //         .catch((err) => {
    //             notify.error(ErrMsg.NOT_AUTHORIZED);
    //         });
    //     }
    return (
        <></>

    );

}

export default Logout;

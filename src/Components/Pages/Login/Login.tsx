import "./Login.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Customer } from "../../../Models/CustomerModel";
import { LoginModel } from "../../../Models/LoginModel";
import { useNavigate } from "react-router-dom";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
// import store from "../../../Redux/store";
import { login } from "../../../Services/Api/CustomerApi";
import store from "../../../Redux/store";
import { loginAction } from "../../../Redux/CustomerAuthAppState";

function Login(): JSX.Element {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup
            .string()
            .required("Please insert valid email")
            .email("Invalid email address"),
        password: yup
            .string()
            .required("Please insert valid password")
            .min(5, "password is too short"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<any>({ mode: "all", resolver: yupResolver(schema) });

    const receivedLoginInfo = async (loginModel: LoginModel) => {
        login(loginModel)
            .then((res) => {
                notify.success(SccMsg.LOGIN_SUCCESS);
                console.log(res.data);
                navigate("/home");
                //update global state
                store.dispatch(loginAction(res.data));
                // store.dispatch
            })
            .catch((err) => {
                notify.error(ErrMsg.INVALID_USERNAME_OR_PASSWORD);
            });
    };

    return (
        <div className="Login">
            <form onSubmit={handleSubmit(receivedLoginInfo)}>
                <input type="text" {...register("email")} name="email" placeholder="Email" />
                <br />
                <span>{errors.email?.message}</span>
                <br />
                <input type="text" {...register("password")} name="password" placeholder="Password" />
                <br />
                <span>{errors.password?.message}</span>
                <br />
                <input type="checkbox" name="remember" title="remember me" />
                <br />
                <button className="button">Login</button>
            </form>
        </div>
    );
}

export default Login;

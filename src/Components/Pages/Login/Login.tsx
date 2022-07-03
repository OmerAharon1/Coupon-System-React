import { yupResolver } from "@hookform/resolvers/yup";
import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { LoginModel } from "../../../Models/LoginModel";
import { loginAction } from "../../../Redux/AuthAppState";
import store from "../../../Redux/store";
import { login } from "../../../Services/Api/UserApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import "./Login.css";

function Login(): JSX.Element {
    const navigate = useNavigate();

    const [clientType, setClientType] = useState("");


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

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setClientType(event.target.value);
    }

    const receivedLoginInfo = async (loginModel: LoginModel) => {
        login(loginModel)
            .then((res) => {
                notify.success(SccMsg.LOGIN_SUCCESS);
                console.log(res.data);
                navigate("/home");
                store.dispatch(loginAction(res.data));

            })
            .catch((err) => {
                notify.error(ErrMsg.INVALID_USERNAME_OR_PASSWORD);
                console.log(loginModel)
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
                <select value={clientType} {...register("clientType")} onChange={handleChange}>
                <option value="CUSTOMER">Customer</option>
                <option value="COMPANY">Company</option>
                <option value="ADMINISTRATOR">Admin</option>
                </select>
                <br />
                <span>{errors.clientType?.message}</span>
                <br />
                <input type="checkbox" name="remember" title="remember me" /> <span>just enjoy</span>
                <br />
                <button className="button">Login</button>
            </form>
        </div>
    );
}

export default Login;

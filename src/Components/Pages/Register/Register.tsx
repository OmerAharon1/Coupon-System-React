import "./Register.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterModel } from "../../../Models/RegisterModel";
import { useNavigate } from "react-router-dom";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
// import store from "../../../Redux/store";
import { register as RegisterApi } from "../../../Services/Api/UserApi";

function Register(): JSX.Element {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        firstName: yup
            .string()
            .required("Please insert valid firstName")
            .min(2, "firstName is too short"),
        lastName: yup
            .string()
            .required("Please insert valid lastName")
            .min(2, "lastName is too short"),

        email: yup
            .string()
            .required("Please insert valid email")
            .email("Invalid email address"),
        password: yup
            .string()
            .required("Please insert valid password")
            .min(5, "password is too short"),
        confirm:
            yup.string()
                .required("Confirm your password")
                .oneOf([yup.ref('password'), null], 'Passwords must match'),

    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<any>({ mode: "all", resolver: yupResolver(schema) });

    const onSubmit = (registerModel: RegisterModel) => {
        let input = new RegisterModel(registerModel.firstName , registerModel.lastName, registerModel.email, registerModel.password);
        console.log(input)
        RegisterApi(input)
            .then((res) => {
                notify.success(SccMsg.REGISTER_SUCCESS);
                console.log(res.data);
                navigate('/login');
            })
            .catch((err) => {
                notify.error(ErrMsg.MISSING_FIELDS);
                console.log(err)
                console.log(err.message)

            });
    };

    return (
        <div className="Register">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("firstName")} name="firstName" placeholder="firstName" />
                <br />
                <span>{errors.firstName?.message}</span>
                <br />
                <input type="text"  {...register("lastName")} name="lastName" placeholder="Last Name" />
                <br />
                <span>{errors.lastName?.message}</span>
                <br />
                <input type="text" {...register("email")} name="email" placeholder="Email" />
                <br />
                <span>{errors.email?.message}</span>
                <br />
                <input type="text" {...register("password")} name="password" placeholder="Password" />
                <br />
                <span>{errors.password?.message}</span>
                <br />
                <input type="text" {...register("confirm")} name="confirm" placeholder="Confirm Password" />
                <br />
                <span>{errors.confirm?.message}</span>
                <br />
                <input type="checkbox" name="remember" title="remember me" />
                <br />
                <button className="button"  type="submit" disabled={!isValid}>
                    Register 
                </button>
            </form>
        </div>
    );
}

export default Register;

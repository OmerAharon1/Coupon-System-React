import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AddCompanyModel } from "../../../Models/AddCompanyModel";
import { addCompany } from "../../../Services/Api/AdminApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import "./AddCompany.css";

function AddCompany(): JSX.Element {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Please insert valid Name")
            .min(2, "firstName is too short"),

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

    const onSubmit = (companyModel: AddCompanyModel) => {
        let input = new AddCompanyModel(companyModel.name, companyModel.email, companyModel.password);
        console.log(input)
        addCompany(input)
            .then((res) => {
                notify.success(SccMsg.REGISTER_SUCCESS);
                console.log(res.data);
                navigate('/adminDashboard');
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
                <input type="text" {...register("name")} name="name" placeholder="name" />
                <br />
                <span>{errors.name?.message}</span>
                <br />
                <input type="text" {...register("email")} name="email" placeholder="email" />
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
                <button className="button" type="submit" disabled={!isValid}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default AddCompany;

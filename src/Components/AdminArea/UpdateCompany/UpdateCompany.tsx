import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Company } from "../../../Models/CompanyModel";
import { companyUpdatedAction } from "../../../Redux/CompaniesAppState";
import store from "../../../Redux/store";
import { updateCompany } from "../../../Services/Api/AdminApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import "./UpdateCompany.css";


function UpdateCompany(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();

    const companyId = +(params.companyId || 0)

    useEffect(() => {

        const subscribe = store.subscribe(() => {
            setCompany(store.getState().companiesReducer.companies.filter(company => company.id === companyId)[0]);
        });
        return subscribe;
    }, []);


    const [company, setCompany] = useState<Company>(store.getState().companiesReducer.companies.filter(company => company.id === companyId)[0]);

    const schema = yup.object().shape({
        name:yup.string()
        ,
        password:
            yup.string()
                .required("Please insert password"),
        email:
            yup.string()
                .required("Please insert email"),

    });

    let defaultValuesObj = { ...company };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<Company>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({
        control
    });


    const sendToRemote = async (company: Company) => {

        updateCompany(companyId, company)
            .then(res => {
                notify.success(SccMsg.UPDATE_CUSTOMER);
                // Updating global state
                setCompany(res.data);
                store.dispatch(companyUpdatedAction(company))
                

                navigate('/adminDashboard/companiesList');

            })
            .catch(err => {
                notify.error(err);
                console.log(company);

                console.log(err.message);
            });
    }






    return (
        <div className="EditCompany">
            <h2>Update Company</h2>
            <form onSubmit={handleSubmit(sendToRemote)}>

            <label htmlFor="name">name</label>
                <br />
                <input
                    type="name"
                    {...register("name")}
                    name="name"
                    placeholder="name" />
                <br />
                <span>{errors.name?.message}</span>

                <br />

                <label htmlFor="email">Email</label>
                <br />
                <input
                    type="email"
                    {...register("email")}
                    name="email"
                    placeholder="email" />
                <br />
                <span>{errors.email?.message}</span>

                <br />

                <label htmlFor="password">Password</label>
                <br />
                <input
                    type="password"
                    {...register("password")}
                    name="password"
                    placeholder="password" />
                <br />
                <span>{errors.password?.message}</span>

                <br />

                <button className="button-app" type="submit">Update Company</button>

            </form>
        </div>
    );
}


export default UpdateCompany;




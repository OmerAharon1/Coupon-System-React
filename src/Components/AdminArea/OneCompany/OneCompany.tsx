import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Company } from "../../../Models/CompanyModel";
import Store from "../../../Redux/store";
import { getOneCompany } from "../../../Services/Api/AdminApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import ProfileCard from "../../SharedArea/ProfileCard/ProfileCard";
import "./OneCompany.css";

function OneCompany(): JSX.Element {

const [id, setId] = useState(0);
const [company, setCompany] = useState<Company>();



const schema = yup.object().shape({
    id: yup
        .number()
        .required("Please insert valid id")
        .min(1)
});

const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
} = useForm<any>({ mode: "all", resolver: yupResolver(schema) });

const onChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setId(e.target.valueAsNumber);
}


const receivedInfo = async () => {

    setCompany(Store.getState().companiesReducer.companies.filter(company => company.id ===id)[0]);

};



return (
    <div className="OneCompany">
        <form onSubmit={handleSubmit(receivedInfo)}>
            <input type="number" {...register("id")} name="id" placeholder="id" onChange={onChange} />
            <br />
            <span>{errors.id?.message}</span>
            <br />
            <button className="button" type="submit" >Search</button>
        </form>
        {company==undefined?
        <><h1>please insert valid company Id</h1></>
        :
        <><ProfileCard key={id} company={company}/> </>}
    </div>
);
}

export default OneCompany;

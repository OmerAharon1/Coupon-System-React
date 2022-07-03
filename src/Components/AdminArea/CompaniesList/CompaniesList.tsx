import { useEffect, useState } from "react";
import { Company } from "../../../Models/CompanyModel";
import { companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
import store from "../../../Redux/store";
import { getAllCompanies } from "../../../Services/Api/AdminApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import ProfileCard from "../../SharedArea/ProfileCard/ProfileCard";
import "./CompaniesList.css";

function CompaniesList(): JSX.Element {

    const [companies, setCompanies] = useState<Company[]>(store.getState().companiesReducer.companies);


    
    useEffect(() => {
        return store.subscribe(() => {
            setCompanies(store.getState().companiesReducer.companies); // Will let us notify
        });

    }
        , [])

    useEffect(() => {
        if(companies.length === 0 ){
            getAllCompanies()
            .then((res) => {
                setCompanies(res.data)
                store.dispatch(companiesDownloadedAction(res.data))
                notify.success(SccMsg.GOT_COMPANIES)
            })
            .catch((err) => {
                notify.error(err)
            })
        }
    }, []);

    return (
        <div className="CompaniesList">
            <ul>
            <button><CustomLink to="oneCompany">Find By Id</CustomLink></button>

                {companies?.map(company => <ProfileCard key={company.id} company={company}/>)}

            </ul>

        </div>
    );

}

export default CompaniesList;

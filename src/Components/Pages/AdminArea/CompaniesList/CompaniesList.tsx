import { useEffect, useState } from "react";
import { Company } from "../../../Models/CompanyModel";
import { getAllCompanies } from "../../../Services/Api/AdminApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import ProfileCard from "../../SharedArea/ProfileCard/ProfileCard";
import "./CompaniesList.css";

function CompaniesList(): JSX.Element {

    const [companies, setCompanies] = useState<Company[]>();


    useEffect(() => {
        getAllCompanies()
            .then((res) => {
                setCompanies(res.data)
                notify.success(SccMsg.GOT_COMPANIES)
            })
            .catch((err) => {
                notify.error(err)
            })

    }, []);

    return (
        <div className="CompaniesList">
            <ul>
                {companies?.map(company => <ProfileCard key={company.companyId} company={company}/>)}

            </ul>

        </div>
    );

}

export default CompaniesList;

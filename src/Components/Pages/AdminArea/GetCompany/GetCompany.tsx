// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Company } from "../../../Models/CompanyModel";
// import Store from "../../../Redux/store";
// import { getOneCompany } from "../../../Services/Api/AdminApi";
// import notify, { SccMsg } from "../../../Services/Notifications";
// import Search from "../../Pages/Search/Search";
// import ProfileCard from "../../SharedArea/ProfileCard/ProfileCard";
// import "./GetCompany.css";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm, useFormState } from "react-hook-form";


// function GetCompany(): JSX.Element {


//     const navigate = useNavigate();
//     const [company, setCompany] = useState<Company>();
//     const [companyID, setCompanyID] = useState<number>(0);



//     const params = useParams();
//     const id = +(params.id || '');

//     const schema = yup.object().shape({
//         id:
//             yup.number(),
//     });

//     let defaultValuesObj = { ...company };

//     // const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
//     //     = useForm<number>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

//     // const { dirtyFields } = useFormState({
//     //     control
//     // });

//     // useEffect(() => {
//     //     // If we don't have a user object - we are not logged in
//     //     if (!store.getState().authReducer.user.token) {
//     //         notify.error(ErrMsg.LOGIN_REQUIRED);
//     //         navigate('/login');
//     //     }
//     // },[])

//     useEffect(() => {

//     }, [company])

//     const sendToRemote = (companyId:number) => {
//         getOneCompany(companyId)
//             .then((res) => {
//                 console.log(res.data)
//                 setCompany(res.data)
//                 //Update Component State
//                 //Update Application State
//                 notify.success(SccMsg.GOT_COMPANY);
//             })
//             .catch((err) => { notify.error(err); });

//     };






//     return (
//         <div className="GetCompany">
//             <ul>

//                 <form onSubmit={handleSubmit(sendToRemote)}>

//                     <label htmlFor="companyId">id</label>
//                     <br />
//                     <input
//                         type="number"
//                         {...register("companyId")}

//                         name="companyId"
//                         placeholder="companyId"
//                         defaultValue={id}
//                     />
//                     <span>{errors.companyId?.message}</span>
//                 </form>
//                 <button className="button-app" type="submit">Create coupon</button>

//                 <ProfileCard company={company}/>


//             </ul>

//         </div>
//     );

// }


// export default GetCompany;

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Customer } from "../../../Models/CustomerModel";
import Store from "../../../Redux/store";
import { getOneCustomer } from "../../../Services/Api/AdminApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import CustomerCard from "../../SharedArea/CustomerCard/CustomerCard";
import "./OneCustomer.css";
function OneCustomer(): JSX.Element {

// const navigate = useNavigate();

const [id, setId] = useState(0);
const [customer, setCustomer] = useState<Customer>();



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
    setCustomer(Store.getState().customersReducer.customers.filter(customer => customer.id ===id)[0]);

};


// const receivedInfo = async () => {
//     getOneCustomer(id)
//         .then((res) => {
//             notify.success(SccMsg.GOT_CUSTOMER);
//             setCustomer(res.data)
//         })
//         .catch((err) => {
//             notify.error(err.message);
//         });
// };

return (
    <div className="OneCustomer">
        <form onSubmit={handleSubmit(receivedInfo)}>
            <input type="number" {...register("id")} name="id" placeholder="id" onChange={onChange} />
            <br />
            <span>{errors.id?.message}</span>
            <br />
            <button className="button" type="submit" >Search</button>
        </form>
        {customer==undefined?
        <><h1>please insert valid customer Id</h1></>
        :
        <><CustomerCard key={customer?.id} customer={customer}/> </>}
    </div>
);
}

export default OneCustomer;

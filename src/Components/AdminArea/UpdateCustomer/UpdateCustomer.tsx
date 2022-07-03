import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Customer } from "../../../Models/CustomerModel";
import { customerUpdatedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/store";
import { updateCustomer } from "../../../Services/Api/AdminApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import "./UpdateCustomer.css";


function UpdateCustomer(): JSX.Element {



    const navigate = useNavigate();

    const params = useParams();
    const customerId = +(params.customerId || '')




    // useEffect(() => {

    //     const subscribe = store.subscribe(() => {
    //         setCustomer(store.getState().couponsReducer.coupons.filter(coupon => coupon.id === couponId)[0] || new CouponModel());
    //     });
    //     return subscribe;
    // }, []);




    const [customer, setCustomer] = useState<Customer>(store.getState().customersReducer.customers.filter(customer => customer.id === customerId)[0]);

    const schema = yup.object().shape({
        firstName:
            yup.string()
                .required("Please insert your first Name")
                .min(2),
        lastName:
            yup.string()
                .required("Please insert your last Name"),
        password:
            yup.string()
                .required("Please insert password"),
        email:
            yup.string()
                .required("Please insert email"),

    });

    let defaultValuesObj = { ...customer };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<Customer>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({
        control
    });


    const sendToRemote = async (customer: Customer) => {

        updateCustomer(customerId, customer)
            .then(res => {
                notify.success(SccMsg.UPDATE_CUSTOMER);
                // Updating global state
                setCustomer(res.data);
                navigate('/adminDashboard/customersList');
                store.dispatch(customerUpdatedAction(customer))


            })
            .catch(err => {
                notify.error(err);
                console.log(err.message);
            });
    }






    return (
        <div className="EditCustomer">
            <h2>Update existing Task</h2>
            <form onSubmit={handleSubmit(sendToRemote)}>




                <label htmlFor="firstName">First Name</label>
                <br />
                <input
                    type="string"
                    step="any"
                    {...register("firstName")}
                    name="firstName"
                    placeholder="firstName"
                    // defaultValue={customer.firstName}
                />
                <br />
                <span>{errors.firstName?.message}</span>

                <br />

                <label htmlFor="lastName">Last Name</label>
                <br />
                <input
                    type="string"
                    {...register("lastName")}
                    name="lastName"
                    placeholder="lastName" />
                <br />
                <span>{errors.lastName?.message}</span>

                <br />

                <label htmlFor="password">Password</label>
                <br />
                <input
                    type="string"
                    {...register("password")}
                    name="password"
                    placeholder="password" />
                <br />
                <span>{errors.password?.message}</span>

                <br />

                <label htmlFor="email">Email</label>
                <br />
                <input
                    type="email"
                    step="any"
                    {...register("email")}
                    name="email"
                    placeholder="email" />
                <br />
                <span>{errors.email?.message}</span>

                <br />

                <button className="button-app" type="submit">Update customer</button>

            </form>
        </div>
    );
}


export default UpdateCustomer;

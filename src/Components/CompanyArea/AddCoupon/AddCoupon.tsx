import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AddCouponModel } from "../../../Models/AddCouponModel";
import store from "../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import "./AddCoupon.css";
import { couponAddedAction } from "../../../Redux/CouponsAppState";
import { addCoupon } from "../../../Services/Api/CompanyApi";
import { getAllCoupons, getOneCoupon } from "../../../Services/Api/CustomerApi";
import { Coupon } from "../../../Models/CouponModel";

function AddCoupon(): JSX.Element {
    const navigate = useNavigate();


    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (store.getState().authReducer.user.clientType !== "COMPANY") {
            notify.error(ErrMsg.NOT_AUTHORIZED);
            navigate('/coupons');
        }
    }, [])

    const schema = yup.object().shape({
        category:
            yup.string()
                .required("category is required"),
        title:
            yup.string()
                .required("Title is required"),
        description:
            yup.string()
                .required("Description is required"),
        startDate:
            yup.date()
                .default(new Date())
                .typeError("You must specify coupon start date")
                .required("start date is required")
                .nullable().default(() => new Date()),
        endDate:
            yup.date()
                .default(new Date())
                .typeError("You must specify coupon end date")
                .required("end date is required")
                
                .nullable().default(() => new Date()),
        amount:
            yup.number()
                .required("amount is required"),
        price:
            yup.number()
                .required("price is required"),
        image:
            yup.string()
                .required("image is required"),

    });


    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<AddCouponModel>({ mode: "all", resolver: yupResolver(schema) });

    const sendToRemote = async (couponModel: AddCouponModel) => {
        couponModel.companyId = store.getState().authReducer.user.id;
        addCoupon(couponModel)
            .then(res => {
                notify.success(SccMsg.ADDED_COMPANY);
                // Updating global state
                store.dispatch(couponAddedAction(res.data));
                navigate('/coupons');

            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log(err.message);
            });
    }
    return (
        <div className="AddCoupon">
            <h2>Add new coupon</h2>
            <form onSubmit={handleSubmit(sendToRemote)}>


                <label htmlFor="category">Category</label>
                <input type="text" {...register("category")} name="category" placeholder="category" />
                <br />
                <span>{errors.category?.message}</span>
                <br />

                <label htmlFor="title">Title</label>
                <input type="text" {...register("title")} name="title" placeholder="title" />
                <br />
                <span>{errors.title?.message}</span>
                <br />

                <label htmlFor="description">Description</label>
                <input type="text" {...register("description")} name="description" placeholder="description" />
                <br />
                <span>{errors.description?.message}</span>
                <br />

                <label htmlFor="startDate">Start Date</label>
                <input type="datetime-local" {...register("startDate")} name="startDate" placeholder="startDate" />
                <br />
                <span>{errors.startDate?.message}</span>
                <br />

                <label htmlFor="endDate">End Date</label>
                <input type="datetime-local" step="any" {...register("endDate")} name="endDate" placeholder="endDate"  />
                <br />
                <span>{errors.endDate?.message}</span>
                <br />

                <label htmlFor="amount">Amount</label>
                <input type="number" {...register("amount")} name="amount" placeholder="amount" />
                <br />
                <span>{errors.amount?.message}</span>
                <br />

                <label htmlFor="price">Price</label>
                <input type="number"  {...register("price")} name="price" placeholder="price" />
                <br />
                <span>{errors.price?.message}</span>
                <br />

                <label htmlFor="image">Image</label>
                <input type="text"  {...register("image")} name="image" placeholder="image" />
                <br />
                <span>{errors.image?.message}</span>
                <br />

                <button className="button-app" type="submit">Create coupon</button>
            </form>
        </div>
    );
}

export default AddCoupon;

import { SetStateAction, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Coupon, Coupon as CouponModel } from "../../../Models/CouponModel";
import store from "../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import "./UpdateCoupon.css";
import * as yup from "yup";
import { useForm, useFormState } from "react-hook-form";
import { updateCoupon } from "../../../Services/Api/CompanyApi";
import { couponUpdatedAction } from "../../../Redux/CouponsAppState";
import { yupResolver } from "@hookform/resolvers/yup";
// import { UpdateCouponModel } from "../../../Models/UpdateCouponModel";
// interface UpdateCouponProps{
//     coupon : CouponModel;
// }
function UpdateCoupon(): JSX.Element {



    const navigate = useNavigate();

    const params = useParams();
    const couponId = +(params.couponId || '')

    // const {couponId} = useParams();


    // useEffect(() => {
    //     if (store.getState().authReducer.user.clientType !== "COMPANY" || store.getState().authReducer.user.id !== coupon.companyId) {
    //         notify.error(ErrMsg.NOT_AUTHORIZED);
    //         navigate('/coupons');

    //     }, [])


    useEffect(() => {

        const subscribe = store.subscribe(() => {
            setCoupon(store.getState().couponsReducer.coupons.filter(coupon => coupon.id === couponId)[0] || new CouponModel());
        });
        return subscribe;
    }, []);




    const [coupon, setCoupon] = useState<CouponModel>(store.getState().couponsReducer.coupons.filter(coupon => coupon.id === couponId)[0]);
    const [category, setCategory] = useState<string>(coupon?.category!);
    const schema = yup.object().shape({
        id:
            yup.number(),
        category:
            yup.string(),
        title:
            yup.string(),
        description:
            yup.string(),
        startDate:
            yup.date()
                .default(new Date())
                .typeError("You must specify start day")
                .required("When is required")
                .nullable().default(() => new Date()),
                // .min(new Date().getDate()-1),
        endDate:
            yup.date()
                .default(new Date())
                .typeError("You must specify task expiration date")
                .required("When is required")
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

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCategory(event.target.value);
    }

    let defaultValuesObj = { ...coupon };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CouponModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({
        control
    });
    

    const sendToRemote = async (couponModel: CouponModel) => {

        updateCoupon(couponId, couponModel)
            .then(res => {
                notify.success(SccMsg.UPDATED_COUPON);
                // Updating global state
                setCoupon(res.data);
                store.dispatch(couponUpdatedAction(res.data));
                
                // defaultValuesObj.id = couponModel.id || id;

                navigate('/companyDetails');

            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log(err.message);
            });
    }






    return (
        <div className="EditTodo">
            <h2>Update existing Coupon</h2>
            <form onSubmit={handleSubmit(sendToRemote)}>

                <label htmlFor="id">id</label>
                <br />
                <input
                    type="number"
                    {...register("id")}

                    name="id"
                    placeholder="id"
                    defaultValue={couponId}
                    />
                <span>{errors.id?.message}</span>


                <br />


                <select value={category} {...register("category")} onChange={handleChange} >
                <option value="FOOD">Food</option>
                <option value="GAMING">Gaming</option>
                <option value="HOME">Home</option>
                </select>
                
                {/* <label htmlFor="category">category</label>
                <br />
                <input
                    type="string"
                    step="any"
                    {...register("category")}
                    name="category"
                    placeholder="category" 

                    /> */}

                    
                <br />
                <span>{errors.category?.message}</span>

                <br />

                <label htmlFor="title">title</label>
                <br />
                <input
                    type="string"
                    {...register("title")}
                    name="title"
                    placeholder="title" />
                <br />
                <span>{errors.title?.message}</span>
                <br />
                <label htmlFor="description">description</label>
                <br />
                <input
                    type="string"
                    {...register("description")}
                    name="description"
                    placeholder="description" />
                <br />
                <span>{errors.description?.message}</span>

                <br />

                <label htmlFor="startDate">start Date</label>
                <br />
                <input
                    type="datetime-local"
                    step="any"
                    {...register("startDate")}
                    name="startDate"
                    placeholder="startDate"
                    />
                <br />
                <span>{errors.startDate?.message}</span>

                <br />

                <label htmlFor="endDate">endDate</label>
                <br />
                <input
                    type="datetime-local"
                    {...register("endDate")}
                    // disabled={true}
                    name="endDate"
                    placeholder="endDate" 
                    />
                    
                <br />
                <span>{errors.endDate?.message}</span>

                <br />

                <label htmlFor="amount">amount</label>
                <br />
                <input
                    type="number"
                    {...register("amount")}
                    // disabled={true}
                    name="amount"
                    placeholder="amount" />
                <br />
                <span>{errors.amount?.message}</span>
                <br />
                <label htmlFor="price">price</label>

                <br />

                <input
                    type="number"
                    {...register("price")}
                    // disabled={true}
                    name="price"
                    placeholder="price" />
                <br />
                <span>{errors.price?.message}</span>

                <br />

                <label htmlFor="image">image</label>
                <br />
                <input
                    type="string"
                    {...register("image")}
                    // disabled={true}
                    name="image"
                    placeholder="image" />
                <br />
                <span>{errors.image?.message}</span>

                <br />
                <button className="button-app" type="submit">Update coupon</button>

            </form>
        </div>
    );
}


export default UpdateCoupon;

import axios from "axios";
import { Company } from "../../Models/CompanyModel";
import { Coupon } from "../../Models/CouponModel";
import { Customer } from "../../Models/CustomerModel";
import globals from "../Globals";

export async function addCoupon(id:number,coupon: Coupon){
    return await axios.post<Coupon>(globals.urls.company+id,coupon)
};

export async function updateCoupon(id:number,coupon: Coupon){
    return await axios.put<any>(globals.urls.company+id,coupon)
};

export async function deleteCoupon(id:number){
    return await axios.delete<any>(globals.urls.company+id)
};

export async function getCompanyCoupons(id:number){
    return await axios.get<Coupon[]>(globals.urls.company+id)
};
export async function getCouponsByCategory(id:number, category:String){
    return await axios.get<Coupon[]>(globals.urls.company+id+'/'+category)
};
export async function getCouponsByMaxPrice(id:number ,maxPrice:number){
    return await axios.get<Coupon[]>(globals.urls.company+id+'/'+maxPrice)
};
export async function getCompanyDetails(id:number){
    return await axios.get<Coupon>(globals.urls.company+id)
};


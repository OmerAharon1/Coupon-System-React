import axios from "axios";
import { Company } from "../../Models/CompanyModel";
import { Coupon } from "../../Models/CouponModel";
import { Customer } from "../../Models/CustomerModel";
import { AddCouponModel } from "../../Models/AddCouponModel";

import globals from "../Globals";
import store from "../../Redux/store";
import tokenAxios from "../tokenAxios";

export async function addCoupon(coupon:AddCouponModel ){

    return await tokenAxios.post<Coupon>(globals.urls.company+"addCoupon/"+coupon.companyId,coupon)
};

export async function updateCoupon(companyId:number,coupon: Coupon){
    return await tokenAxios.put<Coupon>(globals.urls.company+"updateCoupon/"+companyId,coupon);
};

export async function deleteCoupon(id:number){
    return await axios.delete<any>(globals.urls.company+"delete/"+id)
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


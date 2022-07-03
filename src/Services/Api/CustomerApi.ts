import axios from "axios";
import { Coupon } from "../../Models/CouponModel";
import { Customer } from "../../Models/CustomerModel";
import { LoginModel } from "../../Models/LoginModel";
import { RegisterModel } from "../../Models/RegisterModel";

import globals from "../Globals";
import tokenAxios from "../tokenAxios";

// export async function login(loginModel:LoginModel){
//     return await axios.post<Customer>(globals.urls.customer+'login',loginModel)
// };

// export async function register(registerModel:RegisterModel){
//     return await axios.post<RegisterModel>(globals.urls.customer+"register",registerModel)
// };

export async function purchaseCoupon(customerId:number , coupon:Coupon){
    return await tokenAxios.post<Customer>(globals.urls.customer+"purchase/"+customerId,coupon)
};

export async function getCustomerCoupons(id:number){
    return await axios.get<Coupon[]>(globals.urls.customer+"coupons/" + id)
};

export async function getCouponsByCategory(id:number,category:String){
    return await axios.get<Coupon[]>(globals.urls.customer+id +'/'+category)
};

export async function getCouponsByMaxPrice(id:number,maxPrice : number){
    return await axios.get<Coupon[]>(globals.urls.customer+id+'/'+maxPrice)
};

export async function getCustomerDetails(id:number){
    return await tokenAxios.get<Customer>(globals.urls.customer+'customer/'+id)
};

export async function getAvailAbleCoupons(id:number){
    return await axios.get<Coupon[]>(globals.urls.customer+'available/'+id)
};

export async function getAllCoupons(){
    return await axios.get<Coupon[]>(globals.urls.customer+'coupons')
};
export async function getOneCoupon(id:number){
    return await axios.get<Coupon>(globals.urls.customer+'oneCoupon/'+id)
};


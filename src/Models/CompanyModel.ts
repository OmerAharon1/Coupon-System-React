import { Coupon } from "./CouponModel";

export class Company{
    public id?:number;
    public name?:string ;
    public password?:string;
    public email?:string;
    public coupons?:Coupon[];

    public constructor(id?:number,name?:string,password?:string,email?:string,coupons?:Coupon[] ){
        this.id = id || 0 ;
        this.name = name ||'';
        this.password= password||'';
        this.email = email||'';
        this.coupons = coupons || [];
    }

    
    

}
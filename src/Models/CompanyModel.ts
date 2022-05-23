import { Coupon } from "./CouponModel";

export class Company{
    public id?:number;
    public name?:string;
    public title?:string;
    public password?:string;
    public email?:string;
    public coupons?:Coupon[];
    public token?: string;

    public constructor(id?:number,name?:string,title?:string,password?:string,email?:string,coupons?:Coupon[] , token?:string){
        this.id = id || 0 ;
        this.name = name;
        this.title = title;
        this.password= password;
        this.email = email;
        this.coupons = coupons || [];
        this.token= token;
    }

    
    

}
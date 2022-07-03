import { Coupon } from "./CouponModel";

export class Customer{
    public id?:number;
    public firstName?:string;
    public lastName?:string;
    public password?:string;
    public email?:string;
    public coupons?:Coupon[];
    public token?:string;
    public constructor(id?:number,firstName?:string,lastName?:string,password?:string,email?:string,coupons?:Coupon[],token?:string){
        this.id=id||0;
        this.firstName=firstName;
        this.lastName=lastName;
        this.password=password;
        this.email=email;
        this.coupons=coupons;
        this.token=token;
    }
}
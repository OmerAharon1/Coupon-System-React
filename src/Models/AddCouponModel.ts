import { Company } from "./CompanyModel";

export class AddCouponModel {
    public companyId?:number;
    public category?:string;
    public title?:string;
    public description?:string;
    public startDate?:Date;
    public endDate?:Date;
    public amount?:number;
    public price?:number;
    public image?:string;
    
    public constructor(companyId?:number,category?:string,title?:string,description?:string,startDate?:Date,endDate?:Date , amount?:number,price?:number,image?:string){

        this.companyId = companyId;
        this.category = category;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }

}
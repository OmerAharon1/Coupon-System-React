import axios from "axios";
import globals from "../Globals";
import { Company } from "../../Models/CompanyModel";
import { Customer } from "../../Models/CustomerModel";

//company

export async function addCompany(company: Company){
    return await axios.post<Company>(globals.urls.company+'company',company)
};

export async function deleteCompany(id: number){
    return await axios.delete<number>(globals.urls.company+'company/'+id)
};

export async function getAllCompanies(){
    return await axios.get<Company[]>(globals.urls.company+'company')
};
export async function getOneCompany(id:number){
    return await axios.get<Company>(globals.urls.company+'company/'+id)
};

//customer
export async function addCustomer(customer: Customer){
    return await axios.post<Customer>(globals.urls.customer+'customer',customer)
};
export async function updateCustomer(id:number,customer:Customer){
    return await axios.put<any>(globals.urls.customer+'customer/'+id,customer);
};
export async function deleteCustomer(id: number){
    return await axios.delete<any>(globals.urls.customer+'customer'+id)
};
export async function getAllCustomers(){
    return await axios.get<Customer[]>(globals.urls.customer+'customer')
};
export async function getOneCustomer(id:number){
    return await axios.get<Customer>(globals.urls.customer+'customer'+id)
};




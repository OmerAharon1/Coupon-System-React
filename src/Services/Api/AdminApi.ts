import axios from "axios";
import globals from "../Globals";
import { Company } from "../../Models/CompanyModel";
import { Customer } from "../../Models/CustomerModel";
import tokenAxios from "../tokenAxios";

//company

export async function addCompany(company: Company){
    return await axios.post<Company>(globals.urls.admin+'addCompany',company)
};

export async function deleteCompany(id: number){
    return await axios.delete<number>(globals.urls.admin+'deleteCompany/'+id)
};
export async function updateCompany(id:number,company:Company){
    return await axios.put<any>(globals.urls.admin+'updateCompany/'+id,company);
};

export async function getAllCompanies(){
    return await axios.get<Company[]>(globals.urls.admin+'company')
};
export async function getOneCompany(id:number){
    return await axios.get<Company>(globals.urls.admin+'company/'+id)
};

//customer
export async function addCustomer(customer: Customer){
    return await axios.post<Customer>(globals.urls.admin+'customer',customer)
};
export async function updateCustomer(id:number,customer:Customer){
    return await tokenAxios.put<any>(globals.urls.admin+'customer/'+id,customer);
};
export async function deleteCustomer(id: number){
    return await axios.delete<any>(globals.urls.admin+'customer/'+id)
};
export async function getAllCustomers(){
    return await axios.get<Customer[]>(globals.urls.admin+'customers')
};
export async function getOneCustomer(id:number){
    return await tokenAxios.get<Customer>(globals.urls.admin+'customer/'+id)
};




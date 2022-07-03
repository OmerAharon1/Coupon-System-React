import axios from "axios"
import { LoginModel } from "../../Models/LoginModel"
import { RegisterModel } from "../../Models/RegisterModel"
import { UserModel } from "../../Models/UserModel"
import globals from "../Globals"

export async function login(loginModel:LoginModel){
    return await axios.post<UserModel>("http://localhost:8080/login",loginModel)
};

export async function register(registerModel:RegisterModel){
    return await axios.post<RegisterModel>("http://localhost:8080/register",registerModel)
};

// export async function logout(token:string){
//     return await axios.put<any>("http://localhost:8080/logout/" +token)
// };
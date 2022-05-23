// Step 1 - Create AppState and manage the collection once and in a centralize place

import { Company } from "../Models/CompanyModel";
import store from "./store";

export class CompanyAuthAppState {
    public company: Company = new Company();

    public constructor() {
        try {
            const storedCompany = JSON.parse(localStorage.getItem('company') || '');
            if (storedCompany) {
                this.company = storedCompany;
            }
        }
        catch (error) {
            //console.log(error);
        }
    }
}


// Step 2 - Define ActionType using enum for all required operations
export enum CompanyAuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CompanyAuthAction {
    type: CompanyAuthActionType;
    payload?: any; // ? for logout
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function registerAction(): CompanyAuthAction {
    return { type: CompanyAuthActionType.Register, payload: {} };
}

export function loginAction(company: Company): CompanyAuthAction {
    return { type: CompanyAuthActionType.Login, payload: company };
}

export function logoutAction(): CompanyAuthAction {
    return { type: CompanyAuthActionType.Logout };
}

// Step 5 - Reducer function perform the required action
export function companiesAuthReducer(currentState: CompanyAuthAppState = new CompanyAuthAppState(),
    action: CompanyAuthAction): CompanyAuthAppState {

    const newState = { ...currentState } //Spread Operator
    switch (action.type) {
        case CompanyAuthActionType.Register: //Payload is registered user from backend
            newState.company = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.company)); // Saving in the session storage (won't be deleted)
            break;
        case CompanyAuthActionType.Login://Payload is logged i user from backend
            newState.company = action.payload;
            localStorage.setItem("company", JSON.stringify(newState.company)); // Saving in the session storage (won't be deleted)
            break;
        case CompanyAuthActionType.Logout: // No payload
            newState.company = new Company();
            localStorage.removeItem("company");
            break;

    }
    return newState;

}
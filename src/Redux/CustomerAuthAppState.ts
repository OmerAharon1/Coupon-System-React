// Step 1 - Create AppState and manage the collection once and in a centralize place

import { Customer } from "../Models/CustomerModel";
import store from "./store";

export class CustomerAuthAppState {
    public customer: Customer = new Customer();
    public constructor() {
        try {
            const storedCustomer = JSON.parse(localStorage.getItem('customer') || '');
            if (storedCustomer) {
                this.customer = storedCustomer;
            }
        }
        catch (error) {
            //console.log(error);
        }
    }
}


// Step 2 - Define ActionType using enum for all required operations
export enum CustomerAuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CustomerAuthAction {
    type: CustomerAuthActionType;
    payload?: any; // ? for logout
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function registerAction(): CustomerAuthAction {
    return { type: CustomerAuthActionType.Register, payload: {} };
}

export function loginAction(customer: Customer): CustomerAuthAction {
    return { type: CustomerAuthActionType.Login, payload: customer };
}

export function logoutAction(): CustomerAuthAction {
    return { type: CustomerAuthActionType.Logout };
}

// Step 5 - Reducer function perform the required action
export function customerAuthReducer(currentState: CustomerAuthAppState = new CustomerAuthAppState(),
    action: CustomerAuthAction): CustomerAuthAppState {

    const newState = { ...currentState } //Spread Operator
    switch (action.type) {
        case CustomerAuthActionType.Register: //Payload is registered user from backend
            newState.customer = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.customer)); // Saving in the session storage (won't be deleted)
            break;
        case CustomerAuthActionType.Login://Payload is logged i user from backend
            newState.customer = action.payload;
            localStorage.setItem("customer", JSON.stringify(newState.customer)); // Saving in the session storage (won't be deleted)
            break;
        case CustomerAuthActionType.Logout: // No payload
            newState.customer = new Customer();
            localStorage.removeItem("customer");
            break;

    }
    return newState;

}
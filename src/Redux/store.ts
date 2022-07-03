
import { combineReducers, createStore } from "redux";
import { couponsReducer } from "./CouponsAppState";
// import { UsersReducer } from "./UsersAppState";
import { companiesReducer } from "./CompaniesAppState";
import { authReducer } from "./AuthAppState";
import { customersReducer } from "./CustomerAppState";






//Multiple Reducers
const Reducers = combineReducers({
    couponsReducer: couponsReducer,
    authReducer: authReducer,customersReducer: customersReducer,companiesReducer: companiesReducer
    // usersReducer: UsersReducer,
    
});
const Store = createStore(Reducers)


export default Store;
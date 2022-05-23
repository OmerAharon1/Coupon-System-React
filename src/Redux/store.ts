
import { combineReducers, createStore } from "redux";
import { couponsReducer } from "./CouponsAppState";
import { customerAuthReducer } from "./CustomerAuthAppState";
import { companiesReducer } from "./CompaniesAppState";
import { companiesAuthReducer } from "./CompanyAuthAppState";





//Multiple Reducers
const Reducers = combineReducers({
    couponsReducer: couponsReducer,
    customerAuthReduced: customerAuthReducer,
    companiesAuthState: companiesAuthReducer
});
const Store = createStore(Reducers)


export default Store;
import { Notyf } from 'notyf'
export enum SccMsg {
    ADDED_COUPON = 'Coupon added successfully',
    DELETED_COUPON = 'Coupon deleted successfully',
    UPDATED_COUPON = 'Coupon updated successfully',
    GOT_COUPONS = 'Got coupon successfully',
    LOGIN_SUCCESS = "Login successfully",
    REGISTER_SUCCESS = "Register successfully",
    ADDED_COMPANY = 'Company added successfully',
    LOGOUT_SUCCESS = "Logout successfully",
    COUPON_PURCHASE = "Coupon purchased successfully",
    DELETED_COMPANY = "Company deleted successfully",
    REQUEST_SUCCESS = "request performed successfully",
    GOT_COMPANIES = "Companies got successfully",
    GOT_COMPANY = "Got company successfully",
    GOT_CUSTOMERS = "Got customers successfully",
    DELETE_CUSTOMER = "Customer deleted successfully",
    GOT_CUSTOMER = "GOT_CUSTOMER",
    UPDATE_CUSTOMER = "UPDATE_CUSTOMER"
}
export enum ErrMsg {
    INVALID_USERNAME_OR_PASSWORD = 'false email or password',
    MISSING_FIELDS = 'one of the required fields is missing',
    LOGIN_REQUIRED = 'login required',
    ALREADY_PURCHASED = 'Coupon already owned by this user',
    NOT_AUTHORIZED = 'User not authorized',
    PLS_LOGIN = "please login",
    NOT_FOUND = "NOT_FOUND"
}
class Notify {

    private notification = new Notyf({ duration: 4000, position: { x: "left", y: "top" } });
    public success(message: string) {
        this.notification.success(message);
    }

    public error(err: any) {
        const msg = this.extractMsg(err);
        this.notification.error(msg);
    }

    private extractMsg(err: any): string {

        if (typeof err === 'string') {
            return err;
        }

        if (typeof err?.response?.data === 'string') { //Backend exact error
            return err.response.data;
        }

        if (Array.isArray(err?.response?.data)) { // Backend exact error list
            return err?.response?.data[0];
        }


        // Must be last
        if (typeof err?.message === 'string') {
            return err.message;
        }


        return "an error occurred, please try again.";


    }
}
const notify = new Notify();
export default notify;
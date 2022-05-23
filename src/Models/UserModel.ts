export class UserModel {
    public email: string;
    public type: string;
    public token: string;

    public constructor(email?: string, type?: string, token?: string) {
        this.email = email || '';
        this.type = type || '';
        this.token = token || '';
    }
}
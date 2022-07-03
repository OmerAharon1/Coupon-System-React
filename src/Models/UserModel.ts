export class UserModel {
    public id:number;
    public email: string;
    public clientType: string;
    public token: string;
    

    public constructor( id?:number,email?: string, clientType?: string, token?: string) {
        this.id = id || 0;
        this.email = email || '';
        this.clientType = clientType || '';
        this.token = token || '';

    }
}
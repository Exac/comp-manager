import { IUser } from './IUser';

export class User implements IUser {

    public static defaults: IUser = {'id': 0, 'alias': 'Alias', 'email': 'email@example.com'};
    public id: number;
    public alias: string;
    public email: string;
    public password: string;
    public salt: string;

    constructor(_id?: number, _alias?: string, _email?: string) {
        this.id = _id || User.defaults.id;
        this.alias = _alias || User.defaults.alias;
        this.email = _email || User.defaults.email;
    }
}

export interface IUser {
    id: number;
    userId: string;
    firstName: string;
    lastName: string;
    loginName: string;
    password: string;
    email: string | null;
}

export class User implements IUser {
    constructor(
        public id: number = 0,
        public userId: string = '',
        public firstName: string = '',
        public lastName: string = '',
        public loginName: string = '',
        public password: string = '',
        public email: string = ''
    ) {
        this.id = id;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.loginName = loginName;
        this.password = password;
        this.email = email;
    }


}
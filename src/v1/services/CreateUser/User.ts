import Email from "../../../models/Email";
import Password from "../../../models/Password";
import Username from "../../../models/Username";

export interface CreateUserReq {
    email: Email;
    password: Password;
    username: Username;
}

class User {
    private _email?: CreateUserReq['email'];
    private _password?: CreateUserReq['password'];
    private _username?: CreateUserReq['username'];

    set email(value: CreateUserReq['email']) {
        this._email = value;
    };

    set password(value: CreateUserReq['password']) {
        this._password = value;
    };

    set username(value: CreateUserReq['username']) {
        this._username = value;
    };

    constructor({ email, password, username }: CreateUserReq) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

    get email(): CreateUserReq['email'] {
        return this._email as CreateUserReq['email'];
    }

    get password(): CreateUserReq['password'] {
        return this._password as CreateUserReq['password'];
    }

    get username(): CreateUserReq['username'] {
        return this._username as CreateUserReq['username'];
    }
}

export default User;

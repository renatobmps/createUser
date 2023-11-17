export interface PasswordHashing {
    doHash(password: string): Promise<string>;
}

interface PasswordReq {
    password: string,
    passwordHashing: PasswordHashing,
}

class Password {
    private _value?: string;
    private _passwordHashing: PasswordHashing;

    set value(password: string) {
        if (!password) throw new Error(`Password must be defined: ${password}`);
        if (typeof password !== 'string') throw new Error(`Incorrect password type: ${JSON.stringify(password)}`);
        if (password.length < 12) throw new Error(`Password must have less 12 characters: ${password}`);
        if (password.length > 24) throw new Error(`Password must have max 24 characters: ${password}`);
        if (!/[0-9]/.test(password)) throw new Error(`Password must have less 1 number character: ${password}`);
        if (!/[A-Z]/.test(password)) throw new Error(`Password must have less 1 uppercase character: ${password}`);
        if (!/[a-z]/.test(password)) throw new Error(`Password must have less 1 lowercase character: ${password}`);
        if (!/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(password)) throw new Error(`Password must have less 1 lowercase character: ${password}`);

        this._value = password;
    }

    constructor({ password, passwordHashing }: PasswordReq) {
        this.value = password;
        this._passwordHashing = passwordHashing;
    }

    get value(): string {
        return this._value as string;
    }

    get hash(): Promise<string> {
        return this._passwordHashing.doHash(this._value as string);
    }
}

export default Password;

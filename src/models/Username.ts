class Username {
    private _value?: string;

    set value(value: string) {
        if (!value) throw new Error(`Username must be defined: ${JSON.stringify(value)}`);
        if (typeof value !== 'string') throw new Error(`Incorrect username type: ${JSON.stringify(value)}`);

        const username = value.trim();

        if (username.includes(' ')) throw new Error(`Username cannot have space character: ${username}`);
        if (/[A-Z]/.test(username)) throw new Error(`Username cannot have uppercase character: ${username}`);
        if (!/^[a-z1-9_]+$/.test(username)) throw new Error(`Username cannot have special character: ${username}`);

        this._value = username;
    }

    constructor(username: string) {
        this.value = username;
    }

    get value(): string {
        return this._value as string;
    }
}

export default Username;

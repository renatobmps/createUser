class Email {
    private _value?: string;

    set value(value: string) {
        try {
            const email = value.toLowerCase();

            if (!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)) {
                throw new Error(`A email should be a valid email format: ${email}`);
            }

            this._value = email;
        } catch (error) {
            throw error ?? 'Unexpected error';
        }
    };

    constructor(value: string) {
        this.value = value;
    }

    get value(): string {
        return this._value as string;
    }

    get domain(): string | null {
        return this._value?.split('@')[1] ?? null;
    }
}

export default Email;

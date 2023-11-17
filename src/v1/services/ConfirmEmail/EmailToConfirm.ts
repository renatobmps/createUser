import Email from "../../../models/Email";

export interface EmailProps {
    hash: string,
    address: Email,
}

class EmailToConfirm {
    private _hash?: EmailProps['hash'];
    private _address?: EmailProps['address'];

    set address(value: EmailProps['address']) {
        this._address = value;
    }

    set hash(value: EmailProps['hash']) {
        if (!value) throw new Error('Hash is required as id');

        this._hash = value;
    }

    constructor({ address, hash }: EmailProps) {
        this.address = address;
        this.hash = hash;
    }

    get address(): EmailProps['address'] {
        return this._address as EmailProps['address'];
    }

    get hash(): EmailProps['hash'] {
        return this._hash as EmailProps['hash'];
    }
}

export default EmailToConfirm;

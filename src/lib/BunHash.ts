import { PasswordHashing } from "../models/Password";

class BunHash implements PasswordHashing {
    async doHash(password: string): Promise<string> {
        const hash = await Bun.password.hash(password);

        return hash;
    }
}

export default BunHash;

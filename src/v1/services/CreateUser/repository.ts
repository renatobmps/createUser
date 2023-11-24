import { CreateUserRepository } from ".";
import User from "./User";
import PrismaInstance from '../../../lib/PrismaInstance';

class Repository implements CreateUserRepository {
    private _prisma = PrismaInstance;

    findDuplicateByEmail(email: string): Promise<unknown | null> {
        return this._prisma.userEmail.findFirst({
            where: { email }
        });
    }
    findDuplicateByUsername(username: string): Promise<unknown | null> {
        return this._prisma.user.findFirst({
            where: { username }
        });
    }

    async createUser(user: User): Promise<string> {
        const { id: userId } = await this._prisma.user.create({
            data: {
                username: user.username.value,
                hashedPassword: await user.password.hash,
            }
        });

        const { id: emailId } = await this._prisma.userEmail.create({
            data: {
                email: user.email.value,
                user: userId,
            }
        });

        return emailId;
    }
};

export default Repository;

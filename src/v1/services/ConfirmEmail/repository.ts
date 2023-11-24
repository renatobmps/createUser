import { ConfirmEmailRepository, EmailDB } from ".";
import PrismaInstance from '../../../lib/PrismaInstance';

class Repository implements ConfirmEmailRepository {
    private _prisma = PrismaInstance;

    findEmail(emailId: string): Promise<EmailDB | null> {
        return this._prisma.userEmail.findFirst({ where: { id: emailId, verified: false } });
    }

    async activeEmail(emailId: string): Promise<void> {
        await this._prisma.userEmail.update({
            data: { verified: true, activated: true, updatedAt: new Date() },
            where: { id: emailId }
        })
    }
};

export default Repository;

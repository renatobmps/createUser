import { PrismaClient } from '@prisma/client';
import { ConfirmEmailRepository, EmailDB } from ".";

class Repository implements ConfirmEmailRepository {
    private _prisma = new PrismaClient();

    findEmail(emailId: string): Promise<EmailDB | null> {
        return this._prisma.userEmail.findFirst({ where: { id: emailId } });
    }

    async activeEmail(emailId: string): Promise<void> {
        await this._prisma.userEmail.update({
            data: { verified: true, activated: true, updatedAt: new Date() },
            where: { id: emailId }
        })
    }
};

export default Repository;

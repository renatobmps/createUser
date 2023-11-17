import Email from "../../../models/Email";
import EmailToConfirm from "./EmailToConfirm";

export interface EmailDB {
    id: string,
    email: string,
}

export interface ConfirmEmailRepository {
    findEmail(emailId: string): Promise<EmailDB | null>,
    activeEmail(emailId: string): Promise<void>,
}

export interface ConfirmEmailMail {
    sendEmailValidate(emailAddress: string): Promise<string>,
}

export interface Constructor {
    repository: ConfirmEmailRepository,
    mailService: ConfirmEmailMail,
}

export interface ConfirmEmailReq {
    hash: string,
}

class ConfirmEmail {
    private _repository: ConfirmEmailRepository;
    private _mailService: ConfirmEmailMail;

    constructor({ repository, mailService }: Constructor) {
        this._repository = repository;
        this._mailService = mailService;
    }

    async execute({ hash }: ConfirmEmailReq) {
        const db = await this._repository.findEmail(hash);

        if (!db) throw new Error('E-mail not found');

        const emailToConfirm = new EmailToConfirm({
            address: new Email(db.email),
            hash: db.id,
        });

        await Promise.all([
            this._repository.activeEmail(emailToConfirm.hash),
            this._mailService.sendEmailValidate(emailToConfirm.address.value)],
        );
    }
}

export default ConfirmEmail;

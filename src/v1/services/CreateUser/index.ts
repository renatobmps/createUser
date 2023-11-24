import BunHash from "../../../lib/BunHash";
import Email from "../../../models/Email";
import Password from "../../../models/Password";
import Username from "../../../models/Username";
import User from "./User";

export interface CreateUserRepository {
    createUser(user: User): Promise<string>,
    findDuplicateByEmail(email: string): Promise<unknown | null>,
    findDuplicateByUsername(username: string): Promise<unknown | null>,
}

export interface CreateUserMail {
    sendEmailValidate(emailAddress: string, emailId: string): Promise<string>,
}

interface Constructor {
    repository: CreateUserRepository,
    mailService: CreateUserMail,
}

interface CreateUserReq {
    username: string;
    password: string;
    email: string;
}

interface CreateUserRes {
    emailId: string;
}

class CreateUser {
    private _repository: CreateUserRepository;
    private _mailService: CreateUserMail;

    constructor({ repository, mailService }: Constructor) {
        if (!repository) throw new Error('A repository implementation is required');
        if (!mailService) throw new Error('A mail service implementation is required');

        this._repository = repository;
        this._mailService = mailService;
    }

    async execute({ email, password, username }: CreateUserReq): Promise<CreateUserRes> {
        const user = new User({
            email: new Email(email),
            password: new Password({
                password,
                passwordHashing: new BunHash,
            }),
            username: new Username(username),
        });

        const [userByEmail, userByUsername] = await Promise.all([
            this._repository.findDuplicateByEmail(user.email.value),
            this._repository.findDuplicateByUsername(user.username.value)
        ]);

        if (!!userByEmail || !!userByUsername) throw new Error('User already exists');

        const emailId = await this._repository.createUser(user);
        await this._mailService.sendEmailValidate(user.email.value, emailId);

        return {
            emailId,
        };
    }
}

export default CreateUser;

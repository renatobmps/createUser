import { NextApiRequest, NextApiResponse } from "next";
import CreateUser from "../../../../v1/services/CreateUser";
import MailService from "../../../../v1/services/CreateUser/mailService";
import Repository from "../../../../v1/services/CreateUser/repository";

async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const createUser = new CreateUser({
            mailService: new MailService,
            repository: new Repository,
        });

        const { username, password, email } = req.body;

        console.log({ createUser, username, password, email });

        try {
            if (!username || !password || !email) {
                throw {
                    status: 400,
                    message: 'A required field was not sended',
                };
            };

            const { emailId } = await createUser.execute({ username, password, email });
            return res.status(201).json({
                message: 'ok',
                data: { emailId },
            });
        } catch (error: any) {
            return res.status(error?.status ?? 500).json({
                status: 'ko',
                message: error?.message ?? 'Unexpected error',
            });
        };
    }

    return res.status(405);
}

export default handle;

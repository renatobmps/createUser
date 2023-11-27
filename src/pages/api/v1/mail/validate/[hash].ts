import { NextApiRequest, NextApiResponse } from "next";
import ConfirmEmail from "../../../../../v1/services/ConfirmEmail";
import ConfirmEmailRepository from "../../../../../v1/services/ConfirmEmail/repository";
import ConfirmEmailMailService from "../../../../../v1/services/ConfirmEmail/mailService";

async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const confirmEmail = new ConfirmEmail({
            mailService: new ConfirmEmailMailService,
            repository: new ConfirmEmailRepository,
        });

        try {
            const { hash } = req.query as { hash: string };

            if (!hash) {
                throw {
                    status: 400,
                    message: 'Hash not sent',
                };
            };

            confirmEmail.execute({ hash });
            return res.status(200).send(`<h1>Confirmed! Now you can do login</h1>`);
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

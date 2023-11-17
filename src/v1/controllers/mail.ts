import { Router } from 'express';
import ConfirmEmail from '../services/ConfirmEmail';
import Repository from '../services/ConfirmEmail/repository';
import MailService from '../services/ConfirmEmail/mailService';

const router = Router();

router.get('/:hash', (req, res) => {
    const confirmEmail = new ConfirmEmail({
        mailService: new MailService,
        repository: new Repository,
    });

    try {
        const { hash } = req.params;
        if (!hash) {
            throw {
                status: 400,
                message: 'Hash not sent',
            };
        };

        confirmEmail.execute({ hash });
        return res.status(200).send(`<h1>Confirmed! Now you can can do login</h1>`);
    } catch (error: any) {
        return res.status(error?.status ?? 500).json({
            status: 'ko',
            message: error?.message ?? 'Unexpected error',
        });
    };
});

export default router;

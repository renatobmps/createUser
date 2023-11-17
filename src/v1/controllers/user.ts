import { Router } from 'express';
import CreateUser from '../services/CreateUser';
import MailService from '../services/CreateUser/mailService';
import Repository from '../services/CreateUser/repository';

const router = Router();

router.post('/', (req, res) => {
    const createUser = new CreateUser({
        mailService: new MailService,
        repository: new Repository,
    });

    const { username, password, email } = req.body;

    try {
        if (!username || !password || !email) {
            throw {
                status: 400,
                message: 'A required field was not sended',
            };
        };

        createUser.execute({ username, password, email });
        return res.status(201).json({
            message: 'ok',
        });
    } catch (error: any) {
        return res.status(error?.status ?? 500).json({
            status: 'ko',
            message: error?.message ?? 'Unexpected error',
        });
    };
});

export default router;

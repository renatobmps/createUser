import { Router } from 'express';
import ejs from 'ejs';
import fs from 'fs';
import ConfirmEmail from '../services/ConfirmEmail';
import ConfirmEmailRepository from '../services/ConfirmEmail/repository';
import ConfirmEmailMailService from '../services/ConfirmEmail/mailService';

const router = Router();

router.get('/validate/:hash', (req, res) => {
    const confirmEmail = new ConfirmEmail({
        mailService: new ConfirmEmailMailService,
        repository: new ConfirmEmailRepository,
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
        return res.status(200).send(`<h1>Confirmed! Now you can do login</h1>`);
    } catch (error: any) {
        return res.status(error?.status ?? 500).json({
            status: 'ko',
            message: error?.message ?? 'Unexpected error',
        });
    };
});

router.get('/all', async (req, res) => {
    const files = fs.readdirSync('src/mail');

    const str = files.map(file => `<a href="/api/v1/mail/slug/${file.split('.')[0]}">${file.split('.')[0]}</a>`).join('<br>');

    return res.status(200).send(`<h1>All templates</h1>${str}`);
});

router.get('/slug/:slug', (req, res) => {
    const { slug } = req.params;

    ejs.renderFile(`src/mail/${slug}.ejs`, req.query, {}, function (err, str) {
        if (err) {
            const { message, name } = err;

            if (!!name && name.includes('ENOENT')) {
                return res.status(404).send(`<h1>${slug}.ejs not found</h1>`);
            }

            return res.status(400).send(message ?? '<p>Unexpected error</p>');
        }

        return res.status(200).send(str);
    });
});

export default router;

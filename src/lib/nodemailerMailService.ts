import nodemailer from 'nodemailer';

abstract class NodemailerMailService {
    protected _transport = nodemailer.createTransport({
        host: process.env.MAIL_HOTS,
        port: Number(process.env.MAIL_PORT),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });
}

export default NodemailerMailService;

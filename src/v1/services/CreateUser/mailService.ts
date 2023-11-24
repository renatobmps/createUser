import ejs from 'ejs';
import { CreateUserMail } from ".";
import NodemailerMailService from '../../../lib/nodemailerMailService';

class MailService extends NodemailerMailService implements CreateUserMail {
    sendEmailValidate(emailAddress: string, emailHash: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const html = await ejs.renderFile("src/mail/welcome.ejs", {
                confirmationLink: `${process.env.HOST}api/v1/mail/validate/${emailHash}`
            });

            this._transport.sendMail({
                from: process.env.MAIL_FROM,
                to: emailAddress,
                subject: 'Welcome',
                html,
            }, (error, info) => {
                if (error) {
                    reject(error)
                } else {
                    resolve('Email sent: ' + info.response)
                }
            })
        });
    }
}

export default MailService;

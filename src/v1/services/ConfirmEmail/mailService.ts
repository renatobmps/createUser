import ejs from 'ejs';
import { ConfirmEmailMail } from ".";
import NodemailerMailService from '../../../lib/nodemailerMailService';

class MailService extends NodemailerMailService implements ConfirmEmailMail {
    sendEmailValidate(emailAddress: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const html = await ejs.renderFile("src/mail/confirmed_email.ejs", {
                confirmedAddress: emailAddress,
            });

            this._transport.sendMail({
                from: process.env.MAIL_FROM,
                to: emailAddress,
                subject: 'E-mail confirmed',
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

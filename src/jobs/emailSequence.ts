import { Container } from 'typedi';
import MailerService from '../services/mailer';

export default class EmailSequenceJob {
    public async handler(job, done): Promise<void> {
        const { debug, error } = Container.get('logger');
        try {
            debug('✌️ Email Sequence Job triggered!');
            const { email, name }: { [key: string]: string } = job.attrs.data;
            const mailerServiceInstance = Container.get(MailerService);
            await mailerServiceInstance.SendWelcomeEmail(email);
            done();
        } catch (e) {
            error('🔥 Error with Email Sequence Job: %o', e);
            done(e);
        }
    }
}

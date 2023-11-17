import express from 'express';
import user from './v1/controllers/user';
import mail from './v1/controllers/mail.ts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.status(200).send(`<h1>Novo projeto</h1>`);
});

app.use('/api/v1/user', user);
app.use('/api/v1/mail', mail);

app.listen(process.env.PORT, () => {
    console.log(`Server is running: ${process.env.HOST}`)
});

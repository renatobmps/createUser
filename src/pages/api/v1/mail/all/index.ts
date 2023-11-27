import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';

async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const files = fs.readdirSync('src/mail');

        const str = files.map(file => `<a href="/api/v1/mail/slug/${file.split('.')[0]}">${file.split('.')[0]}</a>`).join('<br>');

        return res.status(200).send(`<h1>All templates</h1>${str}`);
    }

    return res.status(405);
}

export default handle;

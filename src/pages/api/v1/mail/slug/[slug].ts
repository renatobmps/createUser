import { NextApiRequest, NextApiResponse } from "next";
import ejs from 'ejs';

async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { slug } = req.query as { slug: string };

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
    }

    return res.status(405);
}

export default handle;

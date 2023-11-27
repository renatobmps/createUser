import { NextApiRequest, NextApiResponse } from "next";

function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        return res.status(200).send(`<h1>Novo projeto</h1>`);
    }

    return res.status(405);
}

export default handle;

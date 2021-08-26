import { getProducts } from "../../../server/models";
import type {NextApiRequest, NextApiResponse} from "next";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            const productList = await getProducts();
            res.status(200).json(productList);
            break;
        default:
            res.status(405).end();
            break;
    }
}

export default handler;

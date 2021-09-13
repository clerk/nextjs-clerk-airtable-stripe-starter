import {getProducts} from "../../../server/models";
import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const resourcesList = await getProducts();
    res.status(200).json(resourcesList);
}

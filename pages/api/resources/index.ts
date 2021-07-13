import { withSession, WithSessionProp } from "@clerk/clerk-sdk-node";
import { createResource, getResources } from "../../../server/models";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Endpoint to show all the resources only to authenticated Clerk users.
 *
 * E.g.
 * /api/recipes
 * /api/houses
 * /api/books
 *
 */

async function handler(
  req: WithSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  /** Allow only logged in users to view the resource list. */
  if (req.session) {
    switch (req.method) {
      case "GET":
        const resourcesList = await getResources();
        res.status(200).json(resourcesList);
        break;
      case "POST":
        const newResource = req.body;
        /** You can enrich the created resource with the identified email as in PUT [id].ts . */
        const createdResource = await createResource(newResource);
        res.status(201).json(createdResource);
        break;
      default:
        res.status(405).end();
        break;
    }
  } else {
    res.status(401).end();
  }
}

export default withSession(handler);

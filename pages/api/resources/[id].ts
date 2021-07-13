import { withSession, WithSessionProp, Clerk } from "@clerk/clerk-sdk-node";
import { deleteResource, updateResource } from "../../../server/models";
import type { NextApiRequest, NextApiResponse } from "next";

const clerkApiInstance = new Clerk({ apiKey: process.env.CLERK_API_KEY });

async function handler(
  req: WithSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  if (req.session && req.session.userId) {
    /**
     * For this example, we want to identify the email of the person doing the action.
     * Don't forget to create the Email field as an 'Email' column type on the resource table.
     * We do this on the server to be a tad safer ;)
     */
    const user = await clerkApiInstance.users.getUser(req.session.userId);
    const primaryEmailAddress = user.emailAddresses.find(
      (emailAddress) => emailAddress.id === user.primaryEmailAddressId
    )?.emailAddress;

    /** On how this works visit https://nextjs.org/docs/api-routes/dynamic-api-routes */
    const resourceId = req.query.id as string;

    switch (req.method) {
      case "PUT":
        /** The client will send the resource object in the PUT request body. */
        const modifiedResource = req.body;
        const updatedResource = await updateResource({
          id: modifiedResource.id,
          fields: {
            UpdatedBy: primaryEmailAddress,
            ...modifiedResource.fields,
          },
        });

        res.status(200).json(updatedResource);
        break;
      case "DELETE":
        /** An authenticated user with the resource id will be able to delete any resource. */
        await deleteResource(resourceId);
        res.status(200).json({ completed: true });
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

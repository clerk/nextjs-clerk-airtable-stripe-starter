import { MyResource, ResourceRecord } from "../../types";
import { airtableBase } from "../db/Airtable";

/** You can retrieve the table name by selecting the Airtable Workspace and copying the name of the table you want to use */
const TABLE_NAME = "Resources";

/** Type the schema of the table like this: */
const resourceTable = airtableBase.table<MyResource>(TABLE_NAME);

export async function getResources() {
  return await resourceTable.select().firstPage();
}

export async function createResource(resource: MyResource) {
  return await resourceTable.create(resource);
}

export async function updateResource(resource: ResourceRecord) {
  return await resourceTable.update([resource]);
}

export async function deleteResource(resourceId: string) {
  return await resourceTable.destroy(resourceId);
}

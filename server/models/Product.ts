import { Product } from "../../types";
import { airtableBase } from "../db/Airtable";

const TABLE_NAME = "Products";

const resourceTable = airtableBase.table<Product>(TABLE_NAME);

export async function getProducts() {
  return await resourceTable.select().firstPage();
}

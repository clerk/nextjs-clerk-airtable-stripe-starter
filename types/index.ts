/** Airtable provides typings e.g. RecordData for you to create your entities and transfer them throughout you application (client/server). */
import type { RecordData, Attachment } from "airtable";

/**
 * For example we might have a MyResource type which is comprised of a Name string column and an Attachment column.
 * Airtable provides all the types of columns and how they are represented on their APIs.
 * As you can see we use the Attachment type for our Pictures column.
 */

export type ResourceRecord = RecordData<MyResource>;
export type ProductRecord = RecordData<Product>;

export type MyResource = {
  Name: string;
  Description: string;
  Pictures: Attachment[];
  UpdatedBy?: string;
};

export type Product = {
  Name: string;
  Description: string;
  SKU: string;
  Price: number;
  Images: Attachment[];
};

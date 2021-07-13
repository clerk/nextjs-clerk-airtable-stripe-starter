import Airtable from "airtable";

if (
  typeof process.env.AIRTABLE_API_KEY === "undefined" ||
  typeof process.env.AIRTABLE_BASE_ID === "undefined"
) {
  throw "You forgot to set AIRTABLE_API_KEY or AIRTABLE_BASE_ID correctly as environment variables!";
}

export const airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

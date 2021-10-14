import { createClient } from 'contentful';

export const client = createClient({
  space: process.env.CMS_SPACE_ID,
  accessToken: process.env.CMS_CDA_AT,
});

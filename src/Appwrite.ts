import { Appwrite } from 'appwrite';
const appwrite = new Appwrite();
const APPWRITE_API: string = (process.env.REACT_APP_APPWRITE_API as string);
const PROJECT_ID: string = (process.env.REACT_APP_PROJECT_ID as string);

appwrite
  .setEndpoint(APPWRITE_API)
  .setProject(PROJECT_ID);

export default appwrite;
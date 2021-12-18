import { Folder } from "./Types";

export default class DiskUtils {

 async isFolderEmpty(folder: Folder): Promise<boolean> {
  throw new Error('Not implemented');
 }

 async getFiles(folder: Folder): Promise<Array<File>> {
  throw new Error('Not implemented');
 }

}
import TreeService from "../Tree/Service.js"
import MemoryService from "../Storage/Memory/Service.js"

export default class DirectoryService {

 treeService
 constructor() {
  // Inject any IStorage implementation based on the backend under use!
  // e.g: MemoryService, DiskService, RemoteService, etc.
  this.treeService = new TreeService(new MemoryService({}));
 }

 get tree() {
  return this.treeService.storage;
 }

 async create(dir, pos) {
  const cmd = "CREATE";
  var info = await this.treeService.getNodeInfo(pos ? pos + '/' + dir : dir);
  var output = '';

  if (info.parent.exists) {
   var infoCreation;
   if (!pos) {
    infoCreation = await this.treeService.addNode(dir)
   } else {
    infoCreation = await this.treeService.addNodeToPosition(dir, pos);
   }
   if (!infoCreation.me.exists) {
    throw new Error("Couldn't " + cmd.toLowerCase() + ' ' + dir + '. Info available: ' + JSON.stringify(infoDeletion));
   }
   output = cmd + ' ' + infoCreation.me.path;
  } else {
   output = cmd + ' ' + pos + '/' + dir + '\n';
   output += 'Cannot ' + cmd.toLowerCase() + ' ' + pos + '/' + dir + ' - ' + info.parent.path + ' does not exist';
  }

  return output + '\n';
 }

 async delete(dir) {
  const cmd = "DELETE";
  var info = await this.treeService.getNodeInfo(dir);
  var output = '';

  if (info.parent.exists) {
   const infoDeletion = await this.treeService.delNode(dir);
   if (infoDeletion.me.exists) {
    throw new Error("Couldn't " + cmd.toLowerCase() + ' ' + dir + '. Info available: ' + JSON.stringify(infoDeletion));
   }
   output = cmd + ' ' + infoDeletion.me.path;
  } else {
   output = cmd + ' ' + dir + '\n';
   output += 'Cannot ' + cmd.toLowerCase() + ' ' + dir + ' - ' + info.parent.path + ' does not exist';
  }

  return output + '\n'
 }

 async list() {
  const cmdOutput = "LIST" + "\n";
  const treeOutput = await this.treeService.toString();
  return cmdOutput + treeOutput;
 }

 async move(dir, pos) {
  const cmd = "MOVE";
  var output = '';

  // get both dir (source) and pos (destination) concurrently
  // useful for slow I/O (DiskService, RemoteService, etc.)
  let [infoDir, infoPos] = await Promise.all([
   await this.treeService.getNodeInfo(dir),
   await this.treeService.getNodeInfo(pos),
  ]);

  if (infoDir.me.exists && infoPos.me.exists) {
   const infoMovement = await this.treeService.moveNodeToPosition(dir, pos);
   if (infoMovement.source.exists || !infoMovement.destination.exists) {
    throw new Error("Couldn't " + cmd.toLowerCase() + ' ' + dir + ' to ' + pos + '. Info available: ' + JSON.stringify(infoMovement));
   }
   output = cmd + ' ' + infoMovement.source.path + ' ' + pos;
  } else {
   output = cmd + ' ' + dir + ' ' + pos + '\n';
   output += 'Cannot ' + cmd.toLowerCase() + ' ' + dir + ' - ' + (!infoDir.me.exists ? infoDir.me.path : infoDir.parent.path) + ' does not exist';
  }

  return output + '\n';
 }

}
import TreeService from "../Tree/Service"
import MemoryService from "../Storage/Memory/Service"
import LoggingService from "../Logging/Service";

export default class DirectoryService {

 treeService: TreeService
 constructor() {
  // Inject any IStorage implementation based on the backend under use!
  // e.g: MemoryService, DiskService, RemoteService, etc.
  this.treeService = new TreeService(new MemoryService({}));
 }

 get tree() {
  return this.treeService.storage;
 }

 async create(dir: string, pos?: string) {
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
    const msg = "Couldn't " + cmd.toLowerCase() + ' ' + dir + '. Info available: ' + JSON.stringify(infoCreation);
    LoggingService.fatal({
     class: this.constructor.name,
     function: this.create.name,
     msg: msg,
     infoCreation: infoCreation
    });
    throw new Error(msg);
   }
   output = cmd + ' ' + infoCreation.me.path;
  } else {
   output = cmd + ' ' + pos + '/' + dir + '\n';
   output += 'Cannot ' + cmd.toLowerCase() + ' ' + pos + '/' + dir + ' - ' + info.parent.path + ' does not exist';
  }

  return output + '\n';
 }

 async delete(dir: string) {
  const cmd = "DELETE";
  var info = await this.treeService.getNodeInfo(dir);
  var output = '';

  if (info.parent.exists) {
   const infoDeletion = await this.treeService.delNode(dir);
   if (infoDeletion.me.exists) {
    const msg = "Couldn't " + cmd.toLowerCase() + ' ' + dir + '. Info available: ' + JSON.stringify(infoDeletion);
    LoggingService.fatal({
     class: this.constructor.name,
     function: this.delete.name,
     msg: msg,
     infoDeletion: infoDeletion
    });
    throw new Error(msg);
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

 async move(dir: string, pos: string) {
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
    const msg = "Couldn't " + cmd.toLowerCase() + ' ' + dir + ' to ' + pos + '. Info available: ' + JSON.stringify(infoMovement);
    LoggingService.fatal({
     class: this.constructor.name,
     function: this.move.name,
     msg: msg,
     infoMovement: infoMovement
    });
    throw new Error(msg);
   }
   output = cmd + ' ' + infoMovement.source.path + ' ' + pos;
  } else {
   output = cmd + ' ' + dir + ' ' + pos + '\n';
   output += 'Cannot ' + cmd.toLowerCase() + ' ' + dir + ' - ' + (!infoDir.me.exists ? infoDir.me.path : infoDir.parent.path) + ' does not exist';
  }

  return output + '\n';
 }

}
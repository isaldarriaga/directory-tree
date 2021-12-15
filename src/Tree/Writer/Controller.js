import TreeReaderController from "../Reader/Controller";

export default class TreeWriterController extends TreeReaderController {

 constructor(IStorage) {
  super(IStorage);
 }

 async addNodeToPosition(node, pos) {
  return this.addNode(pos + '/' + node);
 }

 async addNode(node) {
  this.IStorage.add(node, {});
  return this.getNodeInfo(node);
 }

 async copyNodeToPosition(node, pos) {
  const sourceNode = await this.findNode(node);
  const destinationNode = await this.findNode(pos);
  const dirName = node.substring(node.lastIndexOf('/') + 1);
  destinationNode[dirName] = JSON.parse(JSON.stringify(sourceNode));
  return this.getNodeInfo(pos + '/' + node);
 }

 async delNodeFromPosition(node, pos) {
  return this.delNode(pos + '/' + node);
 }

 async delNode(node) {
  this.IStorage.del(node);
  return this.getNodeInfo(node);
 }

 async moveNodeToPosition(node, pos) {

  var infoBefore = await this.getNodeInfo(node);

  const nodeName = node.substring(node.lastIndexOf('/') + 1);

  var infoAfter;
  if (infoBefore.children.length > 0) {
   // copy the object recursively
   infoAfter = await this.copyNodeToPosition(node, pos);
  } else {
   // just create it
   infoAfter = await this.addNodeToPosition(nodeName, pos);
  }

  if (infoAfter.me.exists) {
   this.delNode(node);
  }

  let [infoSource, infoDestination] = await Promise.all([
   await this.getNodeInfo(node),
   await this.getNodeInfo(pos + '/' + nodeName),
  ]);

  return {
   source: infoSource.me,
   destination: infoDestination.me
  };
 }

}

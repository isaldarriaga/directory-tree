import TreeReaderService from "../Reader/Service.js";

export default class TreeWriterService extends TreeReaderService {

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

  const destinationInfo = await this.getNodeInfo(pos);

  let [valueToCopy, destinationNode] = await Promise.all([
   await this.findNode(node),
   await this.findNode(destinationInfo.parent.path)
  ]);

  const sourceDirName = node.substring(node.lastIndexOf('/') + 1);
  const destinationDirName = pos.substring(pos.lastIndexOf('/') + 1);
  destinationNode[destinationDirName][sourceDirName] = JSON.parse(JSON.stringify(valueToCopy));
  return this.getNodeInfo(pos + '/' + sourceDirName);
 }

 async delNodeFromPosition(node, pos) {
  return this.delNode(pos + '/' + node);
 }

 async delNode(node) {
  this.IStorage.del(node);
  return this.getNodeInfo(node);
 }

 async moveNodeToPosition(node, pos) {

  var infoSourceBeforeMove = await this.getNodeInfo(node);

  const nodeName = node.substring(node.lastIndexOf('/') + 1);

  var infoDestinationAfterCopy;
  if (infoSourceBeforeMove.children.length > 0) {
   // copy the object recursively
   infoDestinationAfterCopy = await this.copyNodeToPosition(node, pos);
  } else {
   // just create it
   infoDestinationAfterCopy = await this.addNodeToPosition(nodeName, pos);
  }

  if (infoDestinationAfterCopy.me.exists) {
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

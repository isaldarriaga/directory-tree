import IStorage from "../../Storage/IStorage";
import TreeReaderService from "../Reader/Service";
import { NodeInfo } from "../Types";

export default class TreeWriterService extends TreeReaderService {

 constructor(IStorage: IStorage) {
  super(IStorage);
 }

 async addNodeToPosition(node: string, pos: string) {
  return this.addNode(pos + '/' + node);
 }

 async addNode(node: string) {
  this.IStorage.add(node, {});
  return this.getNodeInfo(node);
 }

 async copyNodeToPosition(node: string, pos: string) {

  const destinationInfo: NodeInfo = await this.getNodeInfo(pos);
  let valueToCopy, destinationNode;

  if (destinationInfo.parent.path === '') {
   valueToCopy = await this.findNode(node);
   destinationNode = this.IStorage.storage;
  } else {
   [valueToCopy, destinationNode] = await Promise.all([
    await this.findNode(node),
    await this.findNode(destinationInfo.parent.path === '' ? pos : destinationInfo.parent.path)
   ]);
  }

  const sourceDirName = node.substring(node.lastIndexOf('/') + 1);
  const destinationDirName = pos.substring(pos.lastIndexOf('/') + 1);
  destinationNode[destinationDirName][sourceDirName] = JSON.parse(JSON.stringify(valueToCopy));
  return this.getNodeInfo(pos + '/' + sourceDirName);
 }

 async delNodeFromPosition(node: string, pos: string) {
  return this.delNode(pos + '/' + node);
 }

 async delNode(node: string) {
  this.IStorage.del(node);
  return this.getNodeInfo(node);
 }

 async moveNodeToPosition(node: string, pos: string) {

  var infoSourceBeforeMove: NodeInfo = await this.getNodeInfo(node);

  const nodeName = node.substring(node.lastIndexOf('/') + 1);

  var infoDestinationAfterCopy: NodeInfo;
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

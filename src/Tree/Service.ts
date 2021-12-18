import IStorage from "../Storage/IStorage";
import TreeReaderService from "./Reader/Service";
import TreeWriterService from "./Writer/Service";

export default class TreeService {

 IStorage;

 constructor(IStorage: IStorage) {
  this.IStorage = IStorage;
 }

 get storage() {
  // enforce read-only
  return JSON.parse(JSON.stringify(this.IStorage.storage));
 }

 // --- use reader ---

 async findNode(node: string) {
  const treeReader = new TreeReaderService(this.IStorage);
  return await treeReader.findNode(node);
 }

 async nodeExists(node: string) {
  const treeReader = new TreeReaderService(this.IStorage);
  return await treeReader.nodeExists(node);
 }

 async nodeExistsInPosition(node: string, pos: string) {
  const treeReader = new TreeReaderService(this.IStorage);
  return await treeReader.nodeExistsInPosition(node, pos);
 }

 async getNodeInfo(node: string) {
  const treeReader = new TreeReaderService(this.IStorage);
  return await treeReader.getNodeInfo(node);
 }

 async toString() {
  const treeReader = new TreeReaderService(this.IStorage);
  return await treeReader.toString();
 }

 // --- use writer ---

 async addNodeToPosition(node: string, pos: string) {
  const treeWriter = new TreeWriterService(this.IStorage);
  return await treeWriter.addNodeToPosition(node, pos);
 }

 async addNode(node: string) {
  const treeWriter = new TreeWriterService(this.IStorage);
  return await treeWriter.addNode(node);
 }

 async copyNodeToPosition(node: string, pos: string) {
  const treeWriter = new TreeWriterService(this.IStorage);
  return await treeWriter.copyNodeToPosition(node, pos);
 }

 async delNodeFromPosition(node: string, pos: string) {
  const treeWriter = new TreeWriterService(this.IStorage);
  return await treeWriter.delNodeFromPosition(node, pos);
 }

 async delNode(node: string) {
  const treeWriter = new TreeWriterService(this.IStorage);
  return await treeWriter.delNode(node);
 }

 async moveNodeToPosition(node: string, pos: string) {
  const treeWriter = new TreeWriterService(this.IStorage);
  return await treeWriter.moveNodeToPosition(node, pos);
 }

}

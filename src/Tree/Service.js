import TreeReaderController from "./Reader/Controller";
import TreeWriterController from "./Writer/Controller";

export default class TreeService {

 IStorage;

 constructor(IStorage) {
  this.IStorage = IStorage;
 }

 get storage() {
  // ensure read-only
  return JSON.parse(JSON.stringify(this.IStorage.storage));
 }

 async findNode(node) {
  const treeReader = new TreeReaderController(this.IStorage);
  return await treeReader.findNode(node);
 }

 async nodeExists(node) {
  const treeReader = new TreeReaderController(this.IStorage);
  return await treeReader.nodeExists(node);
 }

 async nodeExistsInPosition(node, pos) {
  const treeReader = new TreeReaderController(this.IStorage);
  return await treeReader.nodeExistsInPosition(node, pos);
 }

 async getNodeInfo(node) {
  const treeReader = new TreeReaderController(this.IStorage);
  return await treeReader.getNodeInfo(node);
 }

 async toString() {
  const treeReader = new TreeReaderController(this.IStorage);
  return await treeReader.toString();
 }

 async addNodeToPosition(node, pos) {
  const treeWriter = new TreeWriterController(this.IStorage);
  return await treeWriter.addNodeToPosition(node, pos);
 }

 async addNode(node) {
  const treeWriter = new TreeWriterController(this.IStorage);
  return await treeWriter.addNode(node);
 }

 async copyNodeToPosition(node, pos) {
  const treeWriter = new TreeWriterController(this.IStorage);
  return await treeWriter.copyNodeToPosition(node, pos);
 }

 async delNodeFromPosition(node, pos) {
  const treeWriter = new TreeWriterController(this.IStorage);
  return await treeWriter.delNodeFromPosition(node, pos);
 }

 async delNode(node) {
  const treeWriter = new TreeWriterController(this.IStorage);
  return await treeWriter.delNode(node);
 }

 async moveNodeToPosition(node, pos) {
  const treeWriter = new TreeWriterController(this.IStorage);
  return await treeWriter.moveNodeToPosition(node, pos);
 }

}

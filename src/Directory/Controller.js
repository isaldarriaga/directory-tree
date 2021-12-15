import TreeService from "../Tree/Service"

export default class DirectoryController {

 treeService;
 directoryService;

 constructor(directoryService) {
  this.treeService = new TreeService();
  this.directoryService = directoryService;
 }

 async create() {

 }
 async delete() {

 }

 async list() {

 }

 async move() {

 }

}
import DirectoryService from "./src/Directory/Service.js";

export default class Directories {
 async main() {

  let directoryService = new DirectoryService();

  await directoryService.create("a");
  await directoryService.create("a/b");
  await directoryService.create("a/b/c");
  await directoryService.create("a/b/c/d");
  await directoryService.create("a/b/e");
  await directoryService.create("a/b/e/f");
  await directoryService.move("a/b/e", "a/b/c/d");

  const received = directoryService.tree;

  const expected = {
   a: {
    b: {
     c: {
      d: {
       e: { f: {} }
      }
     }
    }
   }
  };

  console.log(received);
  console.log(expected);

 }
}

new Directories().main().catch((err) => {
 console.error(err);
 process.exit(1);
})


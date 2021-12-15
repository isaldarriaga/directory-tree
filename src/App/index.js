import MemoryStorage from "../Storage/Memory/Storage";
import TreeReader from "../Tree/TreeReader";

export default class App {
 run() {
  const memStorage = new MemoryStorage({
   a: {
    b: {
     c: { d: {} },
     e: { f: {} }
    }
   }
  });

  const treeReader = new TreeReader(memStorage);

  const output = await treeReader.findDir("a/b");

  return output;
 }
}
import App from "./src/UI/App.js";

export default class Directories {
 async main() {

  const app = new App();
  const output = await app.run();

  console.log(output.msg);

  // throw new Error('Not implemented yet => run "npm test"');

 }
}

new Directories().main().catch((err) => {
 console.error(err);
 process.exit(1);
})


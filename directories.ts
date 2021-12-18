import App from "./src/UI/App";

export default class Directories {
 async main() {

  const app = new App();
  const output = await app.run();

  console.log(output.msg);

 }
}

new Directories().main().catch((err) => {
 console.error(err);
 process.exit(1);
})


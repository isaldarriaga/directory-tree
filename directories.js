const _dotenv = require('dotenv').config();

const options = {
 logger: require('pino')({ level: process.env.DEBUG_LEVEL ? process.env.DEBUG_LEVEL : "info" })
}

const app = require('./app')

async function main() {

 if (_dotenv.error) {
  throw _dotenv.error
 }

 const output = await app.run(options);

 console.log(output.msg);

}

main().catch((err) => {
 console.error(err);
 process.exit(1);
})
# Directory-tree

## Installation:

### Prerequisites

1. NodeJS

In Linux (fedora):
```
> sudo dnf install nvm
> nvm use v15.13.0
> node --version
```
It should display: 
```
> v15.13.0
```

Note: use apt-get or brew in other environments!

2. extract the zip file to ```<folder>``` and install module dependencies

cd ```<folder>```
npm install
ls -al

3. Copy sample.env to .env in ```<folder>```

4. the file should look like this

```
# limit the output on screen: silent, fatal, error, warn, info, debug, trace
DEBUG_LEVEL=fatal

# use default values when no cli arguments are received:
VALID_INPUT_FILE=./test-files/01-input/01-valid-commands.txt

# useful on tests
EXPECTED_OUTPUT_FILE=./test-files/02-output/01-expected.txt
EXPECTED_COMMANDS_FILE=./test-files/03-commands/01-expected.txt
INVALID_COMMAND_FILE=./test-files/01-input/02-invalid-command.txt
INVALID_NUM_ARGS_FILE=./test-files/01-input/03-command-with-wrong-arguments.txt

# error messages
ERR_INPUT_FILE_DOES_NOT_EXIST="input file does not exist"
ERR_INPUT_FILE_HAS_INVALID_COMMAND="input file has an invalid command"
ERR_COMMAND_WITH_INVALID_NUM_ARGS="input file has a command with invalid number of arguments"
```

## Run the program
```
> node directories.js
```

## Change verbosity
if you want see debugging output in the console

1. install the program pino-pretty globally to format the output
2. edit .env file and change debug level:
DEBUG_LEVEL=debug

3. then run the program:
```
> node directories.js | pino-pretty
```
if you want see traces (timelapses, etc)

4. edit .env file and change debug level:
DEBUG_LEVEL=trace

5. then run the program:
```
> node directories.js | pino-pretty
```

## The UI

1. if you want to change the default parameters of the program from cli run:
```
node directories.js --help
```
10. something like this will show
```
Usage: directories [options]

Options:
  -V, --version            output the version number
  -f, --input-file <path>  full path to the file with instructions. Overwrites VALID_INPUT_FILE environment variable. (default:
                           "./test-files/01-input/01-valid-commands.txt")
  -h, --help               display help for command
```

# Testing

1. install testing framework ```jest```
```
> npm install jest --global
> npm install --global node-notifier
```

2. execute integration and unit tests
```
> clear && jest directories && jest ./01-cli-manager && jest ./02-file-parser && jest ./03-dir-operator
```

3. expect an output like the following (including code coverage):

```

PASS  ./directories.test.js
  INTEGRATION: The directories app
    ✓ gives a valid output when a valid input file is provided via env variable (5 ms)
    ✓ finishes in less than 5 seconds (1 ms)

---------------------|---------|----------|---------|---------|-------------------------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                   
---------------------|---------|----------|---------|---------|-------------------------------------
All files            |   75.75 |    70.83 |      50 |   75.75 |                                     
 app                 |     100 |      100 |     100 |     100 |                                     
  index.js           |     100 |      100 |     100 |     100 |                                     
 app/01-cli-manager  |    86.2 |       50 |     100 |    86.2 |                                     
  index.js           |    86.2 |       50 |     100 |    86.2 | 19-22                               
 app/02-file-parser  |   46.66 |       70 |     100 |   46.66 |                                     
  index.js           |   46.66 |       70 |     100 |   46.66 | 23-24,28-29,33-34,37-40,44-47,51-84 
 app/03-dir-operator |   86.95 |      100 |      20 |   86.95 |                                     
  dir-create.js      |   57.14 |      100 |       0 |   57.14 | 1-3                                 
  dir-delete.js      |   57.14 |      100 |       0 |   57.14 | 1-3                                 
  dir-list.js        |   57.14 |      100 |       0 |   57.14 | 1-3                                 
  dir-move.js        |   57.14 |      100 |       0 |   57.14 | 1-3                                 
  index.js           |     100 |      100 |     100 |     100 |                                     
---------------------|---------|----------|---------|---------|-------------------------------------
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.569 s, estimated 1 s
Ran all test suites matching /directories/i.
 PASS  app/01-cli-manager/index.test.js
  The cli-manager module
    ✓ accepts an input file that exist (16 ms)
    ✓ reject a file that doesn't exist (1 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |                   
 index.js |     100 |      100 |     100 |     100 |                   
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.51 s, estimated 1 s
Ran all test suites matching /.\/01-cli-manager/i.
 PASS  app/02-file-parser/index.test.js
  The file-parser module
    ✓ return all commands from valid input file (5 ms)
    ✓ reject file with invalid command (1 ms)
    ✓ reject file with wrong number of arguments for command (1 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |   62.22 |    86.36 |     100 |   62.22 |                   
 index.js |   62.22 |    86.36 |     100 |   62.22 | 51-84             
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.551 s, estimated 1 s
Ran all test suites matching /.\/02-file-parser/i.

```
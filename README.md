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

Note: use apt-get or brew in other environments.

2. extract the zip file to ```<folder>``` and install module dependencies, or clone this repo

cd ```<folder>```
npm install
ls -al

### Customization

1. Copy sample.env to .env in ```<folder>```

2. the file should look like this

```
# ==== debugging
# limits the output on screen: silent, fatal, error, warn, info, debug, trace
DEBUG_LEVEL=fatal

# ==== error messages
ERR_INPUT_FILE_DOES_NOT_EXIST="input file does not exist"
ERR_INPUT_FILE_HAS_INVALID_COMMAND="input file has an invalid command"
ERR_COMMAND_WITH_INVALID_NUM_ARGS="input file has a command with invalid number of arguments"

# ==== test files

# valid input for all modules
# APP_VALID_01 --> this file is also loaded by default, overwriding the -f or --file-name cli argument
APP_VALID_01=./test-files/00-app/valid/01.txt

CLI_MANAGER_VALID_01=./test-files/01-cli-manager/valid/01.txt

FILE_PARSER_VALID_01=./test-files/02-file-parser/valid/01.txt

DIR_OPERATOR_VALID_01=./test-files/03-dir-operator/valid/01.txt
DIR_OPERATOR_VALID_02=./test-files/03-dir-operator/valid/02.txt
DIR_OPERATOR_VALID_03=./test-files/03-dir-operator/valid/03.txt

# expected output for valid inputs for all modules
APP_EXPECTED_VALID_01=./test-files/00-app/expected/valid/01.txt

CLI_MANAGER_EXPECTED_VALID_01=./test-files/01-cli-manager/expected/valid/01.txt

FILE_PARSER_EXPECTED_VALID_01=./test-files/02-file-parser/expected/valid/01.txt

DIR_OPERATOR_EXPECTED_VALID_01=./test-files/03-dir-operator/expected/valid/01.txt
DIR_OPERATOR_EXPECTED_VALID_02=./test-files/03-dir-operator/expected/valid/02.txt

# INVALID input for all modules
FILE_PARSER_INVALID_01=./test-files/02-file-parser/invalid/01.txt
FILE_PARSER_INVALID_02=./test-files/02-file-parser/invalid/02.txt

DIR_OPERATOR_INVALID_01=./test-files/03-dir-operator/invalid/01.txt
DIR_OPERATOR_INVALID_02=./test-files/03-dir-operator/invalid/02.txt

# expected output for INVALID inputs for all modules
FILE_PARSER_EXPECTED_INVALID_01=./test-files/02-file-parser/expected/invalid/01.txt
FILE_PARSER_EXPECTED_INVALID_02=./test-files/02-file-parser/expected/invalid/02.txt

DIR_OPERATOR_EXPECTED_INVALID_01=./test-files/03-dir-operator/expected/invalid/01.txt
DIR_OPERATOR_EXPECTED_INVALID_02=./test-files/03-dir-operator/expected/invalid/02.txt


```

3. Change default arguments

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
2. it will display:
```
Usage: directories [options]

Options:
  -V, --version            output the version number
  -f, --input-file <path>  path to the file with commands. Overwrites the APP_VALID_01 environment variable. (default: "./test-files/00-app/valid/01.txt")
  -h, --help               display help for command

```
3. Execute the program with a different valid file:

First copy your file into the test-files folder, like
```
> cp <my-file> ./test-files/00-app/valid/<num>.txt
```
Then run the program again:

```
> node directories.js -f ./test-files/00-app/valid/<num>.txt
```
For example:

```
> node directories.js -f ./test-files/00-app/valid/02.txt
```

Note: use --file-name instead of -f, this way:

```
> node directories.js --file-name ./test-files/00-app/valid/02.txt
```

NOTE: 

- Files with valid commands are expected to be saved into the ``./test-files/00-app/valid`` folder, and their respective expected output into ``./test-files/03-dir-operator/expected/valid``

- Files with INVALID commands are expected to be saved into the ``./test-files/00-app/invalid`` folder, and their respective expected output into ``./test-files/03-dir-operator/expected/invalid``

# Testing

1. install the ```jest``` testing framework 
```
> npm install jest --global
> npm install --global node-notifier
```

2. run all tests
```
> npm test
```

3. execute integration and unit tests selectively
```
> clear && jest directories && jest ./01-cli-manager && jest ./02-file-parser && jest ./03-tree-operator
```

Note: you can run test individually for the desired module (folder), or the integration test only by editing the command above.

3. expect an output like the following (including code coverage):

```

 ❯ npm test                                                  

> test
> jest

 PASS  ./directories.test.js
 PASS  app/03-dir-operator/index.test.js
 PASS  app/01-cli-manager/index.test.js
 PASS  app/02-file-parser/index.test.js
---------------------|---------|----------|---------|---------|-------------------------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                   
---------------------|---------|----------|---------|---------|-------------------------------------
All files            |   87.13 |    82.47 |   88.46 |   87.13 |                                     
 app                 |     100 |      100 |     100 |     100 |                                     
  index.js           |     100 |      100 |     100 |     100 |                                     
 app/01-cli-manager  |   86.21 |       50 |     100 |   86.21 |                                     
  index.js           |   86.21 |       50 |     100 |   86.21 | 19-22                               
 app/02-file-parser  |   46.67 |       70 |     100 |   46.67 |                                     
  index.js           |   46.67 |       70 |     100 |   46.67 | 23-24,28-29,33-34,37-40,44-47,51-84 
 app/03-dir-operator |   94.48 |    83.33 |     100 |   94.48 |                                     
  dir-create.js      |   88.89 |    83.33 |     100 |   88.89 | 18-20                               
  dir-delete.js      |     100 |      100 |     100 |     100 |                                     
  dir-list.js        |     100 |      100 |     100 |     100 |                                     
  dir-move.js        |   82.35 |    33.33 |     100 |   82.35 | 21-23,25-27                         
  index.js           |     100 |      100 |     100 |     100 |                                     
 app/04-tree-utils   |    92.9 |     87.5 |   83.33 |    92.9 |                                     
  index.js           |     100 |      100 |     100 |     100 |                                     
  tree-add.js        |   94.34 |       75 |     100 |   94.34 | 6,16-17                             
  tree-copy.js       |     100 |      100 |     100 |     100 |                                     
  tree-delete.js     |   88.37 |    77.78 |   66.67 |   88.37 | 8-9,31-33                           
  tree-find.js       |   89.74 |      100 |      75 |   89.74 | 17-20                               
  tree-format.js     |     100 |      100 |     100 |     100 |                                     
  tree-info.js       |   98.46 |    91.67 |     100 |   98.46 | 61                                  
  tree-move.js       |   92.68 |      100 |      50 |   92.68 | 35-37                               
  tree-nesting.js    |   64.71 |       50 |     100 |   64.71 | 4-9                                 
---------------------|---------|----------|---------|---------|-------------------------------------

Test Suites: 4 passed, 4 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        1.481 s
Ran all test suites.

```
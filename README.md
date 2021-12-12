# Directory-tree

## The problem
 
A common method of organizing files on a computer is to store them in hierarchical directories. For instance:
 
```
photos/
  birthdays/
    joe/
    mary/
  vacations/
  weddings/
```
 
implement commands that allow a user to create, move and delete directories.
 
A successful solution will take the following input:
 
```
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST
```
 
and produce the following output
 
```
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
fruits
  apples
    fuji
grains
vegetables
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
foods
  fruits
    apples
      fuji
  grains
  vegetables
    squash
DELETE fruits/apples
Cannot delete fruits/apples - fruits does not exist
DELETE foods/fruits/apples
LIST
foods
  fruits
  grains
  vegetables
    squash
```
 
## About the solution

The program is modularized. Each module encapsulates its underlying logic by only exposing methods to access its functionality:

### The ``app`` module

Integrate all modules. It's used by directories.js and testing code to run the application.

It receives an object named ``options`` which is propagated to other modules for configuration purposes. 

``options`` it's particularly used in this demo to pass the unique application logger instance (npm's ``pino``) to other modules. 

The caller to the app module is responsible to load the environment variables present in files, like the .env file. In this demo the code to load .env resides in ``directories.js``

``directories.js`` is just a caller. It can be replaced in the context of an API by a plugin loader.

### The ``01-cli-manager`` module

Parses the input arguments from command line interface (CLI). It uses the ``commander`` npm module.

### The ``02-file-parser`` module

Reads the input file and returns all the commands received in an array. Each element of the array contains an object specifying the command and its arguments:
- cmd: the command (CREATE, DELETE, MOVE, LIST)
- dir: the directory to operate with
- pos: the position in the directory tree to perform the operation. Applies to MOVE and CREATE commands when operating on a subdirectory.

### The ``03-dir-operator`` module

Performs the operations ordered by the array of commands. It holds the in-memory tree the operations will be performed on. The tree structure is implemented as a plain javascript/json object, where keys are the directories managed by the program and the values can be either an empty object ``{}`` (leaf), or a nested object (children).

The tree is validated after each operation to guarantee atomicity for example when moving, deleting, creating.

The tree is returned as part of its main function in order to be validated by the testing code.

### The ``04-tree-utils`` module

Perform operations over the in-memory tree hold by dir-operator, like deep traversing it to find nodes, perform some CRUD actions, get information of nodes, format the node to a string representation, etc. 

When getting information of a node you get:
- info about the parent node (exists?, path)
- info of the node itself (exists?, path)
- info about children (child names in an array)

Notes: 

- The modules are numbered 01, 02, 03, 04 with the purpose to display the order in which they are used. this can be easily changed as necessary.

- The tree object is always received as a reference by this module as a default feature in JS. Thence the tree is modified internally and passed back to the caller (dir-operator) all times. This behavior can be easily OO refactored to a "tree" ``class`` (ES6) with the methods already defined in this module. Single Responsibility Principle can be enforced in a similar way to the current implementation using JS features. After doing this it make sense to refactor the other modules to classes.

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

2. Extract the zip file to ```<folder>``` and install module dependencies, or clone this repo

cd ```<folder>```
npm install
ls -al

### Customization

1. Copy sample.env to .env in ```<folder>```

2. The file should look like this

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
# APP_VALID_01 --> this file is also loaded by default, overwriting the -f or --file-name cli argument
APP_VALID_01=./app/test-files/valid/01.txt

CLI_MANAGER_VALID_01=./app/01-cli-manager/test-files/valid/01.txt

FILE_PARSER_VALID_01=./app/02-file-parser/test-files/valid/01.txt

DIR_OPERATOR_VALID_01=./app/03-dir-operator/test-files/valid/01.txt
DIR_OPERATOR_VALID_02=./app/03-dir-operator/test-files/valid/02.txt
DIR_OPERATOR_VALID_03=./app/03-dir-operator/test-files/valid/03.txt

# expected output for valid inputs for all modules
APP_EXPECTED_VALID_01=./app/test-files/expected/valid/01.txt

CLI_MANAGER_EXPECTED_VALID_01=./app/01-cli-manager/test-files/expected/valid/01.txt

FILE_PARSER_EXPECTED_VALID_01=./app/02-file-parser/test-files/expected/valid/01.txt

DIR_OPERATOR_EXPECTED_VALID_01=./app/03-dir-operator/test-files/expected/valid/01.txt
DIR_OPERATOR_EXPECTED_VALID_02=./app/03-dir-operator/test-files/expected/valid/02.txt

# INVALID input for all modules
FILE_PARSER_INVALID_01=./app/02-file-parser/test-files/invalid/01.txt
FILE_PARSER_INVALID_02=./app/02-file-parser/test-files/invalid/02.txt

DIR_OPERATOR_INVALID_01=./app/03-dir-operator/test-files/invalid/01.txt
DIR_OPERATOR_INVALID_02=./app/03-dir-operator/test-files/invalid/02.txt

# expected output for INVALID inputs for all modules
FILE_PARSER_EXPECTED_INVALID_01=./app/02-file-parser/test-files/expected/invalid/01.txt
FILE_PARSER_EXPECTED_INVALID_02=./app/02-file-parser/test-files/expected/invalid/02.txt

DIR_OPERATOR_EXPECTED_INVALID_01=./app/03-dir-operator/test-files/expected/invalid/01.txt
DIR_OPERATOR_EXPECTED_INVALID_02=./app/03-dir-operator/test-files/expected/invalid/02.txt

```

3. Change default arguments

## Run the program
```
> node directories.js
```

## Change verbosity
If you want see debugging output in the console

1. Install the program pino-pretty globally to format the output
2. Edit .env file and change debug level:
DEBUG_LEVEL=debug

3. Then run the program:
```
> node directories.js | pino-pretty
```
If you want see traces (time lapses, etc)

4. Edit .env file and change debug level:
DEBUG_LEVEL=trace

5. Then run the program:
```
> node directories.js | pino-pretty
```

## The UI

1. If you want to change the default parameters of the program from cli run:
```
node directories.js --help
```
2. It will display:
```
Usage: directories [options]

Options:
  -V, --version            output the version number
  -f, --input-file <path>  path to the file with commands. Overwrites the APP_VALID_01 environment variable. (default: "./app/test-files/valid/01.txt")
  -h, --help               display help for command

```
3. Execute the program with a different valid file:

First copy your file into the test-files folder, like
```
> cp <my-file> ./app/test-files/valid/<num>.txt
```
Then run the program again:

```
> node directories.js -f ./app/test-files/valid/<num>.txt
```
For example:

```
> node directories.js -f ./app/test-files/valid/02.txt
```

Note: use --file-name instead of -f, this way:

```
> node directories.js --file-name ./app/test-files/valid/02.txt
```

NOTE: 

- Files with valid commands are expected to be saved into the ``./app/test-files/valid`` folder, and their respective expected output into ``./app/test-files-operator/expected/valid``

- Files with INVALID commands are expected to be saved into the ``./app/test-files/invalid`` folder, and their respective expected output into ``./app/test-files-operator/expected/invalid``

- Files for individual modules are expected to be saved into the ``./app/<module>/test-files/`` folder

- The module does not include automated tests yet.

# Testing

1. Install the ```jest``` testing framework 
```
> npm install jest --global
> npm install --global node-notifier
```

2. Run all tests
```
> npm test
```

3. Execute integration and unit tests selectively
```
> clear && jest directories && jest ./01-cli-manager && jest ./02-file-parser && jest ./03-tree-operator
```

Note: You can run test individually for the desired module (folder), or the integration test only by editing the command above.

3. Expect an output like the following (including code coverage):

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
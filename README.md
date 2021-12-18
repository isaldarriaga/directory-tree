# Directory-tree

## TL;DR

This is a NodeJS program (Typescript + Jest)

To execute it:
```
> node dist/directories.js
```

To run the tests:
```
> npm test
```

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
 
## The solution

The program is object oriented. Written in TypeScript that transpile to ES6.

*Note: Classes available in ``./src``*

### The ``TreeService`` class

Encapsulates the underlying storage where the "tree" will reside.

Design: Dependency Inversion, Composition, Lazy loading, SRP.

``TreeService`` it's a polymorphic class that accept any type of storage implementation: e.g. In-memory storage, Disk-based storage, Remote storage, etc. as soon as the storage is available in a class that implements the ``IStorage`` abstract class.

Example of dependency injection to ``TreeService``:

```
treeService = new TreeService(new MemoryService({}));

treeService = new TreeService(new DiskService(disk));
```

Both ``MemoryService`` and ``DiskService`` extends the ``IStorage`` class, and can be safely plugged-into the ``TreeService`` instance. 

*Note: More implementation details at: ``./__test__/Tree/Service.test.ts`` and ``./src/Tree/``*

Notice the storage for ``MemoryService`` is a plain Javascript object, and the storage for ``DiskService`` is an typed object named ``Disk``.

*Note: DiskService is not implemented in this version*

Each ``TreeService`` instances is composed of 2 additional classes:

- ``TreeReaderService``
- ``TreeWriterService``

Objects of these types are lazy loaded in the methods of ``TreeService``. They perform the actions to manipulate the storage.

### The ``MemoryService`` class

Implements an in-memory tree using a plain Javascript object.

Design: Dependency Inversion, Composition, Lazy loading, Utility library, SRP.

This class extends from ``IStorage`` and overwrites its methods:
- find
- add
- del

There are 2 specialized classes instantiated in ``MemoryService``'s methods:

- ``MemoryReaderService``
- ``MemoryWriterService``

Both ``MemoryReaderService`` and ``MemoryWriterService`` do in-memory object manipulation in order to implement the tree functions (find, add, del).

Finally, an utility library instance is available for these 2 classes in the ``IStorage`` reference they receive.

Usage: 

You'll get either a ``MemoryUtils`` or a ``DiskUtils`` by calling ``this.IStorage.utils`` from ``MemoryReaderService`` and ``MemoryWriterService`` respectively.

### The ``DirectoryService`` and ``DirectoryController`` classes

The ``DirectoryService`` implements backend logic: a directory tree. 

Design: Command, Proxy

The methods in ``DirectoryService`` matches commands received via UI:
- create
- delete
- list
- move

They validate correctness of commands received and the initial state of the tree.
Finally they delegates the actions to the ``TreeService`` instance. 

By the other hand ``DirectoryController`` behaves as the endpoint to the backend subsystem. It's responsible to receive, log, trace (time-lapses), and dispatch commands to ``DirectoryService``. It uses the ``LoggingService`` utility class.

### The ``CommandString`` and ``CommandFile`` classes

They parse the user input by extracting commands and arguments, and converts them to an object.

The ``CommandString`` perform some validations in the input regarding correctness.

Finally ``CommandFile`` extends from ``CommandString``. It receives a filename and extract its information. This one is useful to let the user pass a --file-name argument to the program.

## Other classes

### The LoggingService class

Design: Singleton

A class with static methods to trace, log, err, etc. messages to stdout via the ``pino`` npm module (high-performance).

Each method correspond to the ``DEBUG_LEVEL`` values that can be set in the ``.env`` file (fatal, error, warn, info, debug, trace). 

*Note: A value of ``silent`` won't log anything to stdout despite the condition of the program.*

### The CLI class

Parses Command Line Interface arguments via the ``commander`` npm module.

### The App class

Integrate all modules

### The Directories class

Runs the application program.

## Installation:

### Prerequisites

1. Install NodeJS

Run:
```
> sudo dnf install nvm
> nvm use v14.18.2
```

*Note: use apt-get or brew in other environments. dnf => fedora linux*

Run:
```
> node --version
> v14.18.2
```

2. Install Typescript

Run:
```
> npm install -g typescript
> tsc -v
```

3. Get the code

Via Web browser:

- Navigate to https://github.com/isaldarriaga/directory-tree/commits/main
- Download the Zip file
- Extract the Zip to ``$HOME/directory-tree``

via CLI:

Run:
```
cd $HOME
git clone https://github.com/isaldarriaga/directory-tree.git
cd directory-tree
```

4. Install code dependencies

Run:
```
cd $HOME/directory-tree
npm install
ls -al
```

### Customization

1. Edit ``$HOME/directory-tree/.env``

2. The file should look like this

```
# ==== debugging
# limits the output on screen: silent, fatal, error, warn, info, debug, trace
DEBUG_LEVEL=fatal

# ==== error messages
ERR_INPUT_FILE_DOES_NOT_EXIST="input file does not exist"
ERR_USER_INPUT_HAS_INVALID_COMMAND="input file has an invalid command"
ERR_COMMAND_WITH_INVALID_NUM_ARGS="input file has a command with invalid number of arguments"

# ==== test files
# this file is loaded by default
COMMAND_VALID_01=./__tests__/Command/files/valid/01.txt
# files with invalid input
COMMAND_INVALID_01=./__tests__/Command/files/invalid/01.txt
COMMAND_INVALID_02=./__tests__/Command/files/invalid/02.txt


```

## Recompile the program with Typescript tools

Run:
```
> tsc
```
*NOTE: optional if ``./dist`` folder is not available*

## Run the program

```
> node dist/directories.js 
```

## Change verbosity
If you want see debugging output in the console

1. Install the program pino-pretty globally to format the output
2. Edit .env file and change debug level:
DEBUG_LEVEL=debug

3. Then run the program:
```
> node dist/directories.js | pino-pretty
```
If you want see traces (time lapses, etc)

4. Edit .env file and change debug level:
DEBUG_LEVEL=trace

5. Then run the program:
```
> node dist/directories.js | pino-pretty
```

## The UI

1. Display help from CLI (Command Line Interface):
```
node dist/directories.js --help
```
2. It will display:
```
Usage: directories [options]

Options:
  -V, --version            output the version number
  -f, --input-file <path>  path to the file with commands. Overwrites the COMMAND_VALID_01 environment variable. (default:
                           "./__tests__/Command/files/valid/01.txt")
  -s, --setupFiles <jest>  allow jest to dotenv/config. You dont need to pass this argument
  -h, --help               display help for command

```
3. Execute the program with a different file:


```
> node dist/directories.js -f /path/to/file
```

or

```
> node dist/directories.js --file-name /path/to/file
```

# Testing

- Test code available in ``./__tests__`` folder

1. Install the ```jest``` testing framework 
```
> npm install jest --global
> npm install --global node-notifier
```

2. Run all tests
```
> npm test
```

3. Execute tests selectively
```
> clear && jest __tests__/Storage
```

*Note: Each folder in ``./__tests__`` correspond to a module in ``./src``.*

## Example of all tests running:

```

 ❯ npm test                                                                                                                                                 ─╯

> directory-tree@1.0.0 test
> jest --setupFiles dotenv/config

 PASS  __tests__/Command/String.test.ts (6.228 s)
  The CommandString object
    ✓ returns the array of commands from a command string sequence (4 ms)

 PASS  __tests__/Storage/Memory/Utils.test.ts (6.465 s)
  The MemoryUtils object
    ✓ tells if an object is empty (3 ms)
    ✓ can safely get the value of an object (array or object) (3 ms)
    ✓ can get the value of a property by its name (1 ms)

 PASS  __tests__/Tree/Writer/Service.ts (6.653 s)
  The TreeWriterService object
    ✓ adds a node to the tree (6 ms)
    ✓ copy a node to a different position in the tree (1 ms)
    ✓ delete a node from position in the tree (1 ms)
    ✓ move a node to a different position in the tree (2 ms)

 PASS  __tests__/UI/CLI.test.ts (6.541 s)
  The CLI object
    ✓ accepts an input file that exist (7 ms)
    ✓ reject a file that doesn't exist (2 ms)

 PASS  __tests__/Storage/Memory/Writer/Service.test.ts (6.812 s)
  The MemoryWriterService object
    ✓ add a node to the in-memory tree and assigns a value (6 ms)

 PASS  __tests__/Command/File.test.ts (6.902 s)
  The CommandFile object
    ✓ returns the array of commands from a command file (5 ms)
    ✓ reject file with invalid command (4 ms)
    ✓ reject file with wrong number of arguments for command (1 ms)

 PASS  __tests__/Storage/Memory/Reader/Service.test.ts (6.848 s)
  The MemoryReaderService object
    ✓ find and return a node in the in-memory tree using a path (4 ms)

 PASS  __tests__/Tree/Reader/Service.test.ts (7.056 s)
  The TreeReaderService object
    ✓ finds a node in the tree (3 ms)
    ✓ formats a tree into an string representation (9 ms)
    ✓ returns the info of a node in the tree (1 ms)

 PASS  __tests__/UI/App.test.ts (7.227 s)
  The App object
    ✓ runs all application components and return results (19 ms)
    ✓ finishes in less than 2 seconds (2 ms)

 PASS  __tests__/Directory/Service.test.ts (7.162 s)
  The DirectoryService object
    ✓ creates a directory in the root's directory tree (4 ms)
    ✓ creates a directory in the tree's second level (1 ms)
    ✓ formats a tree into its string representation (8 ms)
    ✓ delete a node from a position in the tree (2 ms)
    ✓ move a node to a different position in the tree (2 ms)

 PASS  __tests__/Tree/Service.test.ts (7.17 s)
  The TreeService object
    ✓ finds a node in the tree (3 ms)
    ✓ formats a tree into its string representation (8 ms)
    ✓ returns the information of a node in the tree (1 ms)
    ✓ adds a node to the tree (1 ms)
    ✓ copy a node to a different position in the tree
    ✓ delete a node from position in the tree
    ✓ move a node to a different position in the tree (2 ms)
    ✓ is polymorphic

-----------------------|---------|----------|---------|---------|----------------------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                
-----------------------|---------|----------|---------|---------|----------------------------------
All files              |    89.3 |    87.76 |   77.77 |    89.3 |                                  
 Command               |   89.53 |    78.94 |     100 |   89.53 |                                  
  File.ts              |     100 |      100 |     100 |     100 |                                  
  String.ts            |   88.31 |    77.77 |     100 |   88.31 | 34-36,52-54,61-63                
 Directory             |   80.81 |       75 |     100 |   80.81 |                                  
  Controller.ts        |     100 |      100 |     100 |     100 |                                  
  Service.ts           |   70.79 |    70.58 |     100 |   70.79 | 31-39,42-44,57-65,95-103,106-108 
 Logging               |   81.25 |       75 |      50 |   81.25 |                                  
  Service.ts           |   81.25 |       75 |      50 |   81.25 | 9-10,17-18,21-22                 
 Storage               |   66.66 |      100 |      20 |   66.66 |                                  
  IStorage.ts          |   66.66 |      100 |      20 |   66.66 | 12-14,17-18,21-22,25-26          
 Storage/Disk          |   82.45 |      100 |   16.66 |   82.45 |                                  
  Service.ts           |   72.72 |      100 |      25 |   72.72 | 12-13,16-17,20-21                
  Types.ts             |     100 |      100 |     100 |     100 |                                  
  Utils.ts             |   69.23 |      100 |       0 |   69.23 | 6-7,10-11                        
 Storage/Memory        |   98.24 |    92.85 |     100 |   98.24 |                                  
  Service.ts           |     100 |      100 |     100 |     100 |                                  
  Utils.ts             |   96.77 |       90 |     100 |   96.77 | 22                               
 Storage/Memory/Reader |      90 |      100 |   66.66 |      90 |                                  
  Service.ts           |      90 |      100 |   66.66 |      90 | 11-13                            
 Storage/Memory/Writer |   94.11 |    77.77 |     100 |   94.11 |                                  
  Service.ts           |   94.11 |    77.77 |     100 |   94.11 | 20-21,46-47                      
 Tree                  |    92.2 |      100 |   84.61 |    92.2 |                                  
  Service.ts           |    92.2 |      100 |   84.61 |    92.2 | 26-28,31-33                      
 Tree/Reader           |   88.88 |    96.29 |   85.71 |   88.88 |                                  
  Service.ts           |   88.88 |    96.29 |   85.71 |   88.88 | 30-31,91-102                     
 Tree/Writer           |     100 |    91.66 |     100 |     100 |                                  
  Service.ts           |     100 |    91.66 |     100 |     100 | 31                               
 UI                    |     100 |      100 |     100 |     100 |                                  
  App.ts               |     100 |      100 |     100 |     100 |                                  
  CLI.ts               |     100 |      100 |     100 |     100 |                                  
-----------------------|---------|----------|---------|---------|----------------------------------
Test Suites: 11 passed, 11 total
Tests:       33 passed, 33 total
Snapshots:   0 total
Time:        7.96 s, estimated 17 s
Ran all test suites.

```

## Get other versions of the program

The program was written using different approaches in NodeJS.
Each version include its own tests.
Documentation is specific to the version. Make sure to follow pre-requisites / installation steps.

### Modularized (Javascript only) / Dec 12, 2021

#### Via Web browser:

1. Navigate to https://github.com/isaldarriaga/directory-tree/commits/main

2. Look for the revision number in the page: 73709b2
3. Click over [< >] "Browse the repository at this point in the history"
4. Download Zip

#### via CLI:

```
cd $HOME
git clone https://github.com/isaldarriaga/directory-tree.git directory-tree-modularized
cd directory-tree-modularized
git checkout 73709b2
cat README.md
```

### OOP (Javascript with ES6 classes) / Dec 16, 2021

#### Via Web browser:

1. Navigate to https://github.com/isaldarriaga/directory-tree/commits/main

2. Look for the revision number in the page: 0ec3c40
3. Click over [< >] "Browse the repository at this point in the history"
4. Download Zip

#### via CLI:

```
cd $HOME
git clone https://github.com/isaldarriaga/directory-tree.git directory-tree-es6
cd directory-tree-es6
git checkout 0ec3c40
cat README.md
```

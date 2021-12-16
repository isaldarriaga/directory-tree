# Directory-tree

## Tl;dr

This is a NodeJS program. 

To execute it:
```
> node directories.js
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

The program is object oriented based on ES6. Each class encapsulates its underlying logic:

- Classes available in ``./src``

### The ``TreeService`` class

Encapsulates the underlying storage where the "tree" will reside.

Design: Dependency Inversion, Composition, Lazy loading, SRP.

``TreeService`` it's a polymorphic class that accept any type of storage implementation: in-memory storage, disk-based storage, remote storage.., as soon as the storage is available and implements the ``IStorage`` class.

Example of dependency injection:
```
treeService = new TreeService(new MemoryService({}));

treeService = new TreeService(new DiskService(myFileStream));
```

In this case both ``MemoryService`` and ``DiskService`` extends the ``IStorage`` class, and can be safely plugged-into the ``TreeService`` instance at runtime. 

Notice the storage for ``MemoryService`` is a Javascript object, and the storage for ``DiskService`` is a file stream (DiskService is not implemented in this version).

Each ``TreeService`` instances is composed of 2 additional classes:

- ``TreeReaderService``
- ``TreeWriterService``

Objects of these types are lazy loaded in the methods of ``TreeService`` depending on the operations to perform on the tree. Once instantiated they perform the action to manipulate the storage. These objects are destroyed and eventually garbage collected by V8. In a real application they could be closured into the execution context of these methods to increase performance by keeping the instances alive.

### The ``MemoryService`` class

Implements an in-memory storage using a plain Javascript object.

Design: Dependency Inversion, Composition, Lazy loading, Utility library, SRP.

This class extends from ``IStorage`` and overwrites its methods:
- find
- add
- del

2 specialized classes are instantiated when the execution context of these methods is started:

- MemoryReaderService
- MemoryWriterService

Both ``MemoryReaderService`` and ``MemoryWriterService`` specializes in in-memory object manipulation in order to implement the tree functions (find, add, del).

Finally, an utility library instance is available for these 2 classes thanks to the reference to ``IStorage`` that they receive.

Usage: 

By calling ``this.IStorage.utils`` from these 2 classes you'll get either a ``MemoryUtils`` or a ``DiskUtils``  depending on the context.

### The ``DirectoryService`` and ``DirectoryController`` classes


Similar to other Services (``TreeService``, ``MemoryService``), the ``DirectoryService`` implements backend logic: a directory tree in this case.

Design: Command pattern

The methods in ``DirectoryService`` matches commands received via UI:
- create
- delete
- list
- move

They validate correctness of commands received and the initial state of the tree.
Finally they delegates the actions to the ``TreeService`` instance. 

By the other hand ``DirectoryController`` behaves as the endpoint to the backend subsystem. It's responsible to receive, log, trace (time-lapses), and dispatch commands to ``DirectoryService``.

### The ``CommandString`` and ``CommandFile`` classes

They parse the user input by extracting commands and arguments and converts them to an object.

The ``CommandString`` perform some validations in the input regarding correctness.

Finally ``CommandFile`` extends from ``CommandString``. It receives a filename and extract its information. This one is useful to let the user pass a --file-name argument to the program.

## Installation:

### Prerequisites

1. NodeJS

In Linux (fedora):
```
> sudo dnf install nvm
> nvm use v14.18.2
> node --version
```
It should display: 
```
> v14.18.2
```

Note: use apt-get or brew in other environments.

2. Extract the zip file to ```<folder>``` and install module dependencies, or clone this repo

```
cd <folder>
npm install
ls -al
```

### Customization

1. Edit .env in ```<folder>```

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

1. Display help from CLI (Command Line Interface):
```
node directories.js --help
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
> node directories.js -f /path/to/file
```

or

```
> node directories.js --file-name /path/to/file
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

3. Execute a tests selectively
```
> clear && jest __tests__/Storage
```

Note: Just enter the name of a subfolder in ``./__tests__``

## Example of all tests running:

```

 ❯ npm test                                                                                                                                                 ─╯

> directory-tree@1.0.0 test /home/ivan/code/demo/nodejs/directory-tree
> jest --setupFiles dotenv/config

 PASS  __tests__/Tree/Reader/Service.test.js
  The TreeReaderService object
    ✓ finds a node in the tree (6 ms)
    ✓ formats a tree into an string representation (12 ms)
    ✓ returns the info of a node in the tree (2 ms)

 PASS  __tests__/Tree/Service.test.js
  The TreeService object
    ✓ finds a node in the tree (6 ms)
    ✓ formats a tree into its string representation (11 ms)
    ✓ returns the information of a node in the tree (2 ms)
    ✓ adds a node to the tree (1 ms)
    ✓ copy a node to a different position in the tree (2 ms)
    ✓ delete a node from position in the tree (1 ms)
    ✓ move a node to a different position in the tree (3 ms)
    ✓ is polymorphic (1 ms)

 PASS  __tests__/UI/CLI.test.js
  The CLI object
    ✓ accepts an input file that exist (9 ms)
    ✓ reject a file that doesn't exist (1 ms)

 PASS  __tests__/Storage/Memory/Utils.test.js
  The MemoryUtils object
    ✓ tells if an object is empty (4 ms)
    ✓ can safely get the value of an object (array or object) (1 ms)
    ✓ can get the value of a property by its name (1 ms)

 PASS  __tests__/Storage/Memory/Writer/Service.test.js
  The MemoryWriterService object
    ✓ add a node to the in-memory tree and assigns a value (6 ms)

 PASS  __tests__/Command/File.test.js
  The CommandFile object
    ✓ returns the array of commands from a command file (7 ms)
    ✓ reject file with invalid command (2 ms)
    ✓ reject file with wrong number of arguments for command (1 ms)

 PASS  __tests__/Directory/Service.test.js
  The DirectoryService object
    ✓ creates a directory in the root's directory tree (9 ms)
    ✓ creates a directory in the tree's second level (2 ms)
    ✓ formats a tree into its string representation (14 ms)
    ✓ delete a node from a position in the tree (5 ms)
    ✓ move a node to a different position in the tree (7 ms)

 PASS  __tests__/Command/String.test.js
  The CommandString object
    ✓ returns the array of commands from a command string sequence (5 ms)

 PASS  __tests__/Storage/Memory/Reader/Service.test.js
  The MemoryReaderService object
    ✓ find and return a node in the in-memory tree using a path (5 ms)

 PASS  __tests__/Tree/Writer/Service.js
  The TreeWriterService object
    ✓ adds a node to the tree (7 ms)
    ✓ copy a node to a different position in the tree (1 ms)
    ✓ delete a node from position in the tree (1 ms)
    ✓ move a node to a different position in the tree (1 ms)

 PASS  __tests__/UI/App.test.js
  The App object
    ✓ runs all application components and return results (25 ms)
    ✓ finishes in less than 2 seconds (9 ms)

-----------------------|---------|----------|---------|---------|-------------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s       
-----------------------|---------|----------|---------|---------|-------------------------
All files              |   89.67 |     85.1 |   83.33 |   89.67 |                         
 Command               |   89.41 |    83.33 |     100 |   89.41 |                         
  File.js              |     100 |      100 |     100 |     100 |                         
  String.js            |   88.15 |    82.35 |     100 |   88.15 | 33-35,51-53,60-62       
 Directory             |   71.17 |    82.19 |     100 |   71.17 |                         
  Controller.js        |     100 |     87.5 |     100 |     100 | 10                      
  Service.js           |   56.63 |     80.7 |     100 |   56.63 | 19-42,82-106            
 Logging               |   81.25 |       75 |      50 |   81.25 |                         
  Service.js           |   81.25 |       75 |      50 |   81.25 | 9-10,17-18,21-22        
 Storage               |   66.66 |      100 |      20 |   66.66 |                         
  IStorage.js          |   66.66 |      100 |      20 |   66.66 | 12-14,17-18,21-22,25-26 
 Storage/Disk          |   83.78 |      100 |   14.28 |   83.78 |                         
  Service.js           |     100 |      100 |      25 |     100 |                         
  Utils.js             |    62.5 |      100 |       0 |    62.5 | 4-5,8-9,13-14           
 Storage/Memory        |   98.24 |     86.2 |     100 |   98.24 |                         
  Service.js           |     100 |    84.21 |     100 |     100 | 12-22                   
  Utils.js             |   96.77 |       90 |     100 |   96.77 | 22                      
 Storage/Memory/Reader |   89.28 |    93.75 |      75 |   89.28 |                         
  Service.js           |   89.28 |    93.75 |      75 |   89.28 | 9-11                    
 Storage/Memory/Writer |   93.93 |    77.77 |     100 |   93.93 |                         
  Service.js           |   93.93 |    77.77 |     100 |   93.93 | 18-19,44-45             
 Tree                  |     100 |    83.92 |    90.9 |     100 |                         
  Service.js           |     100 |    83.92 |    90.9 |     100 | 19-71                   
 Tree/Reader           |     100 |    87.14 |    90.9 |     100 |                         
  Service.js           |     100 |    87.14 |    90.9 |     100 | 14-30,91                
 Tree/Writer           |     100 |    86.79 |     100 |     100 |                         
  Service.js           |     100 |    86.79 |     100 |     100 | 9-48                    
 UI                    |     100 |       90 |     100 |     100 |                         
  App.js               |     100 |    85.71 |     100 |     100 | 9                       
  CLI.js               |     100 |      100 |     100 |     100 |                         
-----------------------|---------|----------|---------|---------|-------------------------
Test Suites: 11 passed, 11 total
Tests:       33 passed, 33 total
Snapshots:   0 total
Time:        2.147 s
Ran all test suites.



```
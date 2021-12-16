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

The program is object oriented based on ES6. Each class encapsulates its underlying logic:

- Classes available in ./src
- Testing available in ./__tests__

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

Notice the storage for ``MemoryService`` is a Javascript object, and the storage for ``DiskService`` a file stream (not implemented in this program).

Each ``TreeService`` instances is composed of 2 additional classes:

- ``TreeReaderService``
- ``TreeWriterService``

Objects of these types are lazy loaded in the methods of ``TreeService`` depending on the operations to perform on the tree. Once instantiated they perform the action to manipulate the storage. These objects are destroyed and eventually garbage collected by V8. In a real application they could be closured into the execution context of these methods to increase performance by keeping their instances alive.

### The ``MemoryService`` class

Implements an in-memory storage using a plain Javascript object.

Design: Dependency Inversion, Composition, Lazy loading, Utility library, SRP.

This class extends from ``IStorage`` class and overwrites its methods:
- find
- add
- del

when the execution context of these methods is started 2 specialized classes are instantiated:

- MemoryReaderService
- MemoryWriterService

Both ``MemoryReaderService`` and ``MemoryWriterService`` specializes in in-memory object manipulation in order to implement the tree functions (find, add, del).

Finally, an utility library instance is available for these 2 classes thanks to the reference to ``IStorage`` that they receive.

Usage: this.IStorage.utils (MemoryUtils, DiskUtils, etc.)

The ``MemoryService`` provides the instance to ``MemoryUtils`` in its constructor with the implementation details associated to in-memory management. 

Another Storage Service like ``DiskService`` should provide ``DiskUtils`` in order to keep this pattern.

### The ``DirectoryService`` and ``DirectoryController`` classes

Similar to other Services (``TreeService``, ``MemoryService``), the ``DirectoryService`` implements backend logic for a directory tree in this case.

Design: Commander, MVC (kind of)

The methods in ``DirectoryService`` matches commands received via UI:
- create
- delete
- list
- move

They validate correctness of commands received and the initial state of the tree.
Finally they delegates the actions to the ``TreeService`` instance. 

By the other hand ``DirectoryController`` behaves as the endpoint to the backend subsystem. It's responsible to receive, log, trace (time-lapses), and dispatch commands to ``DirectoryService``.

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
ERR_INPUT_FILE_HAS_INVALID_COMMAND="input file has an invalid command"
ERR_COMMAND_WITH_INVALID_NUM_ARGS="input file has a command with invalid number of arguments"

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
> clear && jest __tests__/Storage && jest __tests__/Tree && jest __tests__/Directory
```

Note: You can run test individually for the desired module (folder), or the integration test only by editing the command above.

3. Expect an output like the following (including code coverage):

```

 ❯ npm test                                                  

> directory-tree@1.0.0 test /home/ivan/code/demo/nodejs/directory-tree
> jest

 PASS  __tests__/Tree/Writer/Service.js
  The TreeWriterService object
    ✓ adds a node to the tree (7 ms)
    ✓ copy a node to a different position in the tree (2 ms)
    ✓ delete a node from position in the tree (1 ms)
    ✓ move a node to a different position in the tree (2 ms)

 PASS  __tests__/Storage/Memory/Utils.test.js
  The MemoryUtils object
    ✓ tells if an object is empty (3 ms)
    ✓ can safely get the value of an object (array or object) (1 ms)
    ✓ can get the value of a property by its name (1 ms)

 PASS  __tests__/Storage/Memory/Writer/Service.test.js
  The MemoryWriterService object
    ✓ add a node to the in-memory tree and assigns a value (4 ms)

 PASS  __tests__/Storage/Memory/Reader/Service.test.js
  The MemoryReaderService object
    ✓ find and return a node in the in-memory tree using a path (5 ms)

 PASS  __tests__/Tree/Reader/Service.test.js
  The TreeReaderService object
    ✓ finds a node in the tree (5 ms)
    ✓ formats a tree into an string representation (12 ms)
    ✓ returns the info of a node in the tree (2 ms)

 PASS  __tests__/Directory/Service.test.js
  The DirectoryService object
    ✓ creates a directory in the root's directory tree (5 ms)
    ✓ creates a directory in the tree's second level (2 ms)
    ✓ formats a tree into its string representation (12 ms)
    ✓ delete a node from a position in the tree (3 ms)
    ✓ move a node to a different position in the tree (6 ms)

 PASS  __tests__/Tree/Service.test.js
  The TreeService object
    ✓ finds a node in the tree (5 ms)
    ✓ formats a tree into its string representation (10 ms)
    ✓ returns the information of a node in the tree (1 ms)
    ✓ adds a node to the tree (2 ms)
    ✓ copy a node to a different position in the tree (1 ms)
    ✓ delete a node from position in the tree (1 ms)
    ✓ move a node to a different position in the tree (2 ms)
    ✓ is polymorphic (1 ms)

-----------------------|---------|----------|---------|---------|-------------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s       
-----------------------|---------|----------|---------|---------|-------------------------
All files              |   79.68 |    80.86 |   80.95 |   79.68 |                         
 Directory             |   48.35 |    68.51 |     100 |   48.35 |                         
  Service.js           |   48.35 |    68.51 |     100 |   48.35 | 18-34,42-53,67-84       
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
 Storage/Memory/Writer |   93.93 |    76.47 |     100 |   93.93 |                         
  Service.js           |   93.93 |    76.47 |     100 |   93.93 | 18-19,44-45             
 Tree                  |     100 |       84 |   85.71 |     100 |                         
  Service.js           |     100 |       84 |   85.71 |     100 | 19-71                   
 Tree/Reader           |   59.82 |    84.05 |    90.9 |   59.82 |                         
  Service.js           |   59.82 |    84.05 |    90.9 |   59.82 | 31-75                   
 Tree/Writer           |     100 |       80 |   91.66 |     100 |                         
  Service.js           |     100 |       80 |   91.66 |     100 | 13-42                   
-----------------------|---------|----------|---------|---------|-------------------------
Test Suites: 7 passed, 7 total
Tests:       25 passed, 25 total
Snapshots:   0 total
Time:        1.557 s, estimated 2 s
Ran all test suites.


```
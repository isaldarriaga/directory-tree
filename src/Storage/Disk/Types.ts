
export enum Filesystem {
 zfs,
 fat32,
 xfs
}

export type Disk = {
 filesystem: Filesystem
 mount: string,
 obj: any // -> actual object with data
}

export type Folder = {
 disk: Disk
 path: string
}

export type File = {
 folder: Folder,
 path: string
}
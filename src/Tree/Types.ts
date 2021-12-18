export interface NodeDetails {
 exists: boolean
 path: string
}

export interface NodeInfo {
 parent: NodeDetails
 me: NodeDetails
 children: string[];
}
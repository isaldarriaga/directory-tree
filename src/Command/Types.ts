export type Command = {
 cmd: "LIST";
 dir?: undefined;
 pos?: undefined;
} | {
 cmd: "CREATE";
 dir: string;
 pos: string;
} | {
 cmd: "CREATE";
 dir: string;
 pos?: undefined;
} | {
 cmd: "DELETE";
 dir: string;
 pos?: undefined;
} | {
 cmd: "MOVE";
 dir: string;
 pos: string;
}
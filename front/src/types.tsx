export interface Level {
    creator: string;
    endcode: string;
    startcode: string;
    id: number;
    name: string;
}
export interface Score {
    username: string;
    score: number;
}
export interface ModalValues {
    startcode: string;
    endcode: string;
    name: string;
}
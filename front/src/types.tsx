export interface Level {
    creator: string;
    end_code: string;
    start_code: string;
    id: number;
    name: string;
}
export interface Score {
    username: string;
    score: number;
}
export interface ModalValues {
    start_code: string;
    end_code: string;
    name: string;
}
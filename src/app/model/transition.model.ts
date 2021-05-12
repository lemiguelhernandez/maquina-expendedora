export enum TypeNext {
    AUTO = 'AUTO', 
    MANUAL = 'MANUAL'
}

export interface Transition {
    from: string;
    to: string;
    symbol: string;
    next?: TypeNext;
}
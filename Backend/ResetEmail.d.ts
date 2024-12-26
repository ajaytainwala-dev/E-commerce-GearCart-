export interface ResetEmail {
    email: string;
    token: string;
    requestedAt: Date;
}

declare const ResetEmail: ResetEmail; 
declare module 'ResetEmail' {
    export = ResetEmail;
}
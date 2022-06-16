export interface IUser {
    user: string;
    password: string;
    role: 'admin' | 'client'
}
import { createContext } from 'react';
import { IUser } from '../../interfaces';


interface contextProps{
    role?: string | undefined;
    isLoggedIn: boolean;
    //metodos
    LoginUser: (user: string, password: string) => Promise<Boolean>;
    logout: () => void;
}

export const AuthContext = createContext({} as contextProps)
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react'
import socksApi from '../../api/socksApi';
import { IUser } from '../../interfaces';
import { AuthContext } from './AuthContext';
import { AuthReducer } from './authReducer';

export interface AuthState {
    isLoggedIn: boolean;
    role?: string | undefined
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    role: undefined
}

interface Props {
    children: JSX.Element[] | JSX.Element
}


const AuthProvider: React.FC<Props> = ({children}) => {

    const router = useRouter()

    const [state, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE)

    const LoginUser =async (user:string, password: string):Promise<Boolean> => {
        try {
            const {data} = await socksApi.post('/user/login', {user, password})
            Cookies.set('role', data.role)
            dispatch({type: 'Auth - Login', payload: data.role})
            router.replace("/")
            return true
        } catch (error) {
            return false
        }
    }

    useEffect(() => {
        const role = Cookies.get('role')
        if(!role) return;
        dispatch({type: 'Auth - Load user from Cookies', payload: role});
    }, [])
    
    


    const logout = () => {
      Cookies.remove("role")
      dispatch({type: 'Auth - Logout'})
      router.reload()
    }


    return (
        <AuthContext.Provider value={{
            ...state,
            //METODOS
            LoginUser,
            logout
        }}>
            {
                children
            }
        </AuthContext.Provider>
    )
}

export default AuthProvider



import { IUser } from "../../interfaces";
import { AuthState } from "./AuthProvider";

type AuthType = 
|{ type: "Auth - Login", payload: string}
|{ type: "Auth - Load user from Cookies", payload: string} 
|{ type: "Auth - Logout"}

export const AuthReducer = (state: AuthState, action: AuthType):AuthState => {
    
    switch (action.type) {
        case 'Auth - Load user from Cookies': 
        case 'Auth - Login' :
            return {
                ...state, 
                isLoggedIn: true,
                role: action.payload
            }
         case 'Auth - Logout':
            return {
                ...state,
                isLoggedIn: false,
                role: 'client'
            }  
        default:
            return state;
    }


}
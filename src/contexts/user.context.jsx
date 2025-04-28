import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import {createAction} from '../utils/reducer/reducer.utils';

// as the actual value you want to access
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,

})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state,action) => {
    console.log('dispatched');
    console.log(action);

    const { type, payload } = action;   // payload can be whatever, object, integer, array, undefined, null whatever --- type is string 

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload    // action.payload
            }
        default:
            throw new Error(`Unhandlled type ${type} in userReducer`);  
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const { currentUser } = state;

    console.log(currentUser);
    
    const setCurrentUser = (user) => {
        dispatch(
            createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
        );
    }

    const value = { currentUser, setCurrentUser };

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })

        return unsubscribe;
    },[]); 

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}
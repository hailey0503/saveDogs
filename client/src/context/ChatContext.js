import { createContext, useContext, userState, useEffect, useReducer } from 'react'
import { auth } from '../firebase'
import { GoogleAuthProvider} from 'firebase/auth'
import { useAuth } from "./AuthContext"

export const ChatContext = createContext("")


export function useChatAuth() {
	return useContext(ChatContext)
}

export function ChatContextProvider({ children }) {
	const { currentUser } = useAuth()
	const INITIAL_STATE = {
		chatId: "",
		user: {}
	}
	const chatReducer = (state, action) => {
		switch(action.type) {
			case "CHANGE_USER":
				return {
					user:action.payload,
					chatId:
						currentUser.uid > action.payload.uid
        				? currentUser.uid + action.payload.uid
        				: action.payload.uid + currentUser.uid,
				}
		default:
			return state;
		}
		
	}
	const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
	
	
  return (
	<ChatContext.Provider value = {{ data:state, dispatch }}>
		{ !loading && children }
	</ChatContext.Provider>
  )
}
 
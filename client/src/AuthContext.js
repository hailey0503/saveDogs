import React,  { useContext, useState, useEffect } from 'react'
import { auth } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const AuthContext = React.createContext( )


export function useAuth() {
	return useContext(AuthContext)
}
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()

	function signUp(email, password) {
		return createUserWithEmailAndPassword(auth, email, password)
	}
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
		})
		return unsubscribe
	}, [])
	
	const value = {
		currentUser,
		signUp
	}
  return (
	<AuthContext.Provider value = {value}>
		{ children }
	</AuthContext.Provider>
  )
}
 
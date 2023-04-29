import React from 'react'
import { auth } from '../firebase'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

const AuthContext = React.createContext( )


export function useAuth() {
	return React.useContext(AuthContext)
}
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = React.useState()
	const [loading, setLoading] = React.useState(true)
	const provider = new GoogleAuthProvider();

	function signUp(email, password, username) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function logIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function loginWithGoogle() {
		return signInWithPopup(auth, provider);
	}
	function logOut() {
		return signOut(auth)
	}
	React.useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			console.log(user)
			setCurrentUser(user);
			setLoading(false)	
		})
		return unsubscribe;
	}, [])
	
	const value = {
		currentUser,
		logIn,
		signUp,
		loginWithGoogle,
		logOut
	}
  return (
	<AuthContext.Provider value = {value}>
		{ !loading && children }
	</AuthContext.Provider>
  )
}
 
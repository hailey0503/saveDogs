import React from 'react'
import { auth } from '../firebase'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'

const AuthContext = React.createContext( )


export function useAuth() {
	return React.useContext(AuthContext)
}
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = React.useState()
	//const [ currentUid, setUid] = React.useState()
	const [loading, setLoading] = React.useState(true)
	const provider = new GoogleAuthProvider();

	async function signUp(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	async function logIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	async function loginWithGoogle() {
		return signInWithPopup(auth, provider);
	}	
	async function logOut() {
		return signOut(auth)
	}
	React.useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			//console.log(user)
			setCurrentUser(user);
			//console.log(auth.currentUser)
			if (auth.currentUser) {
				const uid = auth.currentUser.uid;
				const displayName = auth.currentUser.displayName;
				const email = auth.currentUser.email;
				const photoURL = auth.currentUser.photoURL;
				const emailVerified = auth.currentUser.emailVerified;
				console.log(uid) //works
				console.log(displayName)
				
			}
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
 
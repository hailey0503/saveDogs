import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

export function withPublic(Components) {
  return function withPublic(props) {
	const auth = useAuth()
	const router = useRouter()
	//console.log(auth.currentUser)
	if (auth.currentUser) {
		router.replace("/mypage")
		return <h1>loading...</h1>
	}
	return <Components auth = {auth} {...props}/>
  }
}

export function withProtected(Components) {
	return function withProtected(props) {
	  const auth = useAuth()
	  const router = useRouter()
	  //console.log(auth.currentUser)
	  if (!auth.currentUser) {
		  router.replace("login")
		  return <h1>loading...</h1>
	  }
	  return <Components auth = {auth} {...props}/>
	}
}


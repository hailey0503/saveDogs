import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { RotatingLines } from 'react-loader-spinner'

export function withPublic(Components) {
  return function withPublic(props) {
	const auth = useAuth()
	const router = useRouter()
	//console.log(auth.currentUser)
	if (auth.currentUser) {
		router.replace(`../mypage/${auth.currentUser.uid}`)
		
		return <RotatingLines
		strokeColor="pink"
		strokeWidth="5"
		animationDuration="0.75"
		width="64"
		visible={true}
	  />
	  
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
		  router.replace("../login")
		  return <RotatingLines
		  strokeColor="pink"
		  strokeWidth="5"
		  animationDuration="0.75"
		  width="64"
		  visible={true}
		/>
	  }
	  return <Components auth = {auth} {...props}/>
	}
}


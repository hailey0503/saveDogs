import React from 'react'
import Sidebar from '../../comps/sidebar.js'
import Chat from '../../comps/chat.js'
import { withProtected } from '../../src/app/routes';

function chat({auth}){
	const { currentUser } = auth;
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default withProtected(chat);
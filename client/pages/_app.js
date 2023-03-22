import '@/styles/globals.css'
import { AuthProvider } from '@/src/context/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  
  )
}

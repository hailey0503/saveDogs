import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth";

console.log(process.env.NEXT_PUBLIC_API_KEY);
console.log(process.env.NEXT_PUBLIC_AUTH_DOMAIN);
console.log(process.env.NEXT_PUBLIC_PROJECT_ID);
console.log(process.env.NEXT_PUBLIC_STORAGE_BUCKET);
console.log(process.env.NEXT_PUBLIC_APP_ID);

const app = !getApps().length ? initializeApp({
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID 	
}):getApp();
export const auth = getAuth(app);
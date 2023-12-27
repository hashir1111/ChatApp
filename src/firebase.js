import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDxde5Zr1A45N6XQA4pWf5B3F9VzJcIUv8",
  authDomain: "chatapp-d7d13.firebaseapp.com",
  projectId: "chatapp-d7d13",
  storageBucket: "chatapp-d7d13.appspot.com",
  messagingSenderId: "105026214207",
  appId: "1:105026214207:web:fb52b77f70fbf3ef5a5b8a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;


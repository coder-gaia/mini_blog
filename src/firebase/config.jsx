import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi1CklJa5IHOcxUaSvdoU51CyDbWT4DOs",
  authDomain: "mini-blog-a1a95.firebaseapp.com",
  projectId: "mini-blog-a1a95",
  storageBucket: "mini-blog-a1a95.appspot.com",
  messagingSenderId: "1006169194463",
  appId: "1:1006169194463:web:dc3ace6962c98784d84e6a",
  measurementId: "G-REKMLDPD9Q",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app);

export { app, analytics, database };

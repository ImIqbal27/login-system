// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGzRERXU8mt-Wz9on70EXACVMnE6TA2QU",
  authDomain: "email-password-auth-eaf28.firebaseapp.com",
  projectId: "email-password-auth-eaf28",
  storageBucket: "email-password-auth-eaf28.appspot.com",
  messagingSenderId: "1013728734574",
  appId: "1:1013728734574:web:70c0d4c49c3f2dbaf7257f",
  measurementId: "G-DZQ1STH0BL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app ;
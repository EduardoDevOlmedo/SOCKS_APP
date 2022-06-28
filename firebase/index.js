import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyBUJFnfp4NCnXG_1Vle-MQpb7YWB7p-m64",
    authDomain: "socks-images.firebaseapp.com",
    projectId: "socks-images",
    storageBucket: "socks-images.appspot.com",
    messagingSenderId: "470152734938",
    appId: "1:470152734938:web:830b237a6224ba351f9de3",
    measurementId: "G-MH2Z1W2F31"
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
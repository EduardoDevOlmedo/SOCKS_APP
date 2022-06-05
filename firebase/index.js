import firebase from 'firebase/app';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUJFnfp4NCnXG_1Vle-MQpb7YWB7p-m64",
    authDomain: "socks-images.firebaseapp.com",
    projectId: "socks-images",
    storageBucket: "socks-images.appspot.com",
    messagingSenderId: "470152734938",
    appId: "1:470152734938:web:830b237a6224ba351f9de3",
    measurementId: "G-MH2Z1W2F31"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();


export { storage, firebase as default };
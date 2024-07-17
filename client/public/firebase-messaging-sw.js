// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBdFwdlpOVt9HnIsssU_qtc3B2W_IZPW7A",
    authDomain: "todoapp-dfe68.firebaseapp.com",
    projectId: "todoapp-dfe68",
    storageBucket: "todoapp-dfe68.appspot.com",
    messagingSenderId: "125315918226",
    appId: "1:125315918226:web:53638d1fcb3932e050f94b",
    measurementId: "G-C6S2M4E188"
  };
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message: ', payload);
});

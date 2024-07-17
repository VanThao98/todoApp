// firebaseUtils.js

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, PermissionState } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBdFwdlpOVt9HnIsssU_qtc3B2W_IZPW7A",
    authDomain: "todoapp-dfe68.firebaseapp.com",
    projectId: "todoapp-dfe68",
    storageBucket: "todoapp-dfe68.appspot.com",
    messagingSenderId: "125315918226",
    appId: "1:125315918226:web:53638d1fcb3932e050f94b",
    measurementId: "G-C6S2M4E188"
  };

const validKey = "BEcTdy4q_9jkZ1OyIdnTVhzAqmiCvRm0oGx76vaEpKjg2xbHjEg-5gHPPdM4JcSJ1ECZrKfhAUSgU2Kvaeo_HFo";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app)

export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { validKey });
      return token;
    } else {
      throw new Error("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting FCM token: ", error);
    throw error;
  }
};

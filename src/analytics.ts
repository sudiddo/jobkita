import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBvBZ_ck0tc__ljhpVtvGsUfRkXo2kxe-I",
  authDomain: "jobkita-c0301.firebaseapp.com",
  projectId: "jobkita-c0301",
  storageBucket: "jobkita-c0301.appspot.com",
  messagingSenderId: "553060201673",
  appId: "1:553060201673:web:5a9e927282143664e44918",
  measurementId: "G-K028H0XL4N",
};

let analytics;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export default analytics as Analytics;

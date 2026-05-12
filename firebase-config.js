import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKzFFvvI1YpUQS0egOSOeeEsJ-3emvwng",
  authDomain: "amg-data-hub-fc194.firebaseapp.com",
  projectId: "amg-data-hub-fc194",
  storageBucket: "amg-data-hub-fc194.firebasestorage.app",
  messagingSenderId: "707108311634",
  appId: "1:707108311634:web:0ced751a70faaac46e458b",
  measurementId: "G-4DRMK6TZDW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
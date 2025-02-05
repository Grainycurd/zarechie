// Импорт необходимых модулей из Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAxQSl-D9UqEMKd7gQxCCOsS4XFpm9YJHQ",
    authDomain: "protecteddocs-6073b.firebaseapp.com",
    projectId: "protecteddocs-6073b",
    storageBucket: "protecteddocs-6073b.firebasestorage.app",
    messagingSenderId: "1008725347834",
    appId: "1:1008725347834:web:40c0507f42d2ad112ea843",
    measurementId: "G-CPFC7ZV0T1"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Экспорт базы данных для использования в других файлах
export { db };
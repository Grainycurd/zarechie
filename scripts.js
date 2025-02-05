// Импортируем Firestore из firebase-config.js
import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    // СЛАЙД-ШОУ
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function changeSlide() {
        slides.forEach((slide, index) => {
            slide.style.opacity = 0; // Скрываем все слайды
            if (index === currentSlide) {
                slide.style.opacity = 1; // Показываем текущий
            }
        });

        currentSlide = (currentSlide + 1) % slides.length; // Переход к следующему
    }

    setInterval(changeSlide, 5000); // Автоматическая смена каждые 5 секунд
    changeSlide(); // Инициализация

    // Элементы для модального окна
    const showPasswordModalButton = document.getElementById("showPasswordModal");
    const passwordModal = document.getElementById("passwordModal");
    const decryptButton = document.getElementById("decryptButton");

    // Открыть модальное окно
    showPasswordModalButton.addEventListener("click", function () {
        passwordModal.style.display = "flex"; // Показать модальное окно
    });

    // Закрыть модальное окно (если нужно)
    passwordModal.addEventListener("click", function (event) {
        if (event.target === passwordModal) {
            passwordModal.style.display = "none"; // Скрыть модальное окно при клике вне его
        }
    });

    // ПРОВЕРКА ПАРОЛЯ
    decryptButton.addEventListener("click", async function () {
        const enteredPassword = document.getElementById("password").value.trim();

        if (!enteredPassword) {
            alert("Введите пароль!");
            return;
        }

        try {
            console.log("Проверка пароля:", enteredPassword);
            const docRef = doc(db, "password", enteredPassword);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Документ найден:", docSnap.data());
                setTimeout(() => {
                    window.location.href = docSnap.data().link;
                }, 10);
            } else {
                console.log("Неверный пароль.");
                alert("Неверный пароль!");
            }
        } catch (error) {
            console.error("Ошибка Firestore:", error);
            alert("Ошибка соединения с базой данных.");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");

    burger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
});
// Открытие модального окна при нажатии на кнопку "Ввести пароль"
document.querySelector('.show-password-btn').addEventListener('click', function () {
    document.getElementById('passwordModal').style.display = 'flex';
});

// Закрытие модального окна при клике на область за пределами модального окна
document.getElementById('passwordModal').addEventListener('click', function (event) {
    if (event.target === document.getElementById('passwordModal')) {
        document.getElementById('passwordModal').style.display = 'none';
    }
});
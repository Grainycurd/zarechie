// Импортируем Firestore из firebase-config.js
import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    // СЛАЙД-ШОУ

    // Получаем все слайды и кнопки
    const slides = document.querySelectorAll('.hero-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    // Функция обновления видимости слайдов
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.style.opacity = index === currentSlide ? "1" : "0";
            slide.style.transition = "opacity 0.5s ease-in-out"; // Плавное переключение
        });
    }

    // Функция автоматического переключения слайдов
    function autoChangeSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    // Функция смены слайдов при нажатии на кнопки
    function changeImage(n) {
        clearInterval(slideInterval); // Останавливаем авто-смену при клике
        currentSlide = (currentSlide + n + slides.length) % slides.length; // Переключаем слайд
        updateSlides();
        slideInterval = setInterval(autoChangeSlide, 5000); // Перезапускаем авто-смену
    }

    // Добавляем обработчики событий для кнопок
    prevButton.addEventListener('click', () => changeImage(-1));
    nextButton.addEventListener('click', () => changeImage(1));

    // Запускаем слайд-шоу
    updateSlides();
    slideInterval = setInterval(autoChangeSlide, 5000);

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
    const navLinks = document.querySelector(".burger-menu");

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
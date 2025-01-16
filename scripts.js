document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    // Функция для смены слайдов
    function changeSlide() {
        slides.forEach((slide, index) => {
            slide.style.opacity = 0; // Все слайды скрыты
            if (index === currentSlide) {
                slide.style.opacity = 1; // Показываем текущий слайд
            }
        });

        // Переход к следующему слайду
        currentSlide = (currentSlide + 1) % slides.length;
    }

    // Запускаем смену слайдов каждую секунду
    setInterval(changeSlide, 5000);

    // Инициализация слайдшоу
    changeSlide();
});
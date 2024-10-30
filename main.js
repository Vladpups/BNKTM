// Инициализация виджета погоды
window.addEventListener("DOMContentLoaded", function () {
    var widget1 = new WeatherWidget("#widget1", {
        city: "Тирасполь",
        kind: "sunny",
        time: new Date(),
        temperature: 25,
        temperature_scale: "C",
        wind: 5,
        wind_unit: "м/с",
        visibility: 10,
        visibility_unit: "км",
        air_quality: 54,
        humidity: 59
    });

    // Обработка бургер-меню
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('no-scroll'); // Предотвращает прокрутку при открытом меню

        // Обновление ARIA атрибута
        const expanded = burger.getAttribute('aria-expanded') === 'true' || false;
        burger.setAttribute('aria-expanded', !expanded);
    });

    // Закрытие меню при клике на ссылку (для мобильных)
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navMenu.classList.remove('active');
            burger.classList.remove('active');
            body.classList.remove('no-scroll');
            burger.setAttribute('aria-expanded', false);
        }
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
            navMenu.classList.remove('active');
            burger.classList.remove('active');
            body.classList.remove('no-scroll');
            burger.setAttribute('aria-expanded', false);
        }
    });

    // Прокрутка хедера при скролле (опционально)
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
});

// Класс виджета погоды
class WeatherWidget {
    constructor(el, data) {
        this.el = document.querySelector(el);
        this.weather = data;
        this.displayWeather();
        this.setupToggle();
    }

    displayWeather() {
        if (!this.weather) return;

        const propElements = this.el.querySelectorAll('[data-stat]');
        propElements.forEach(el => {
            const prop = el.getAttribute('data-stat');
            let value = this.weather[prop];
            if (prop === 'time') {
                const options = { hour: 'numeric', minute: '2-digit' };
                value = new Intl.DateTimeFormat('ru-RU', options).format(this.weather.time);
            }
            if (this.weather[`${prop}_unit`]) {
                value += ` ${this.weather[`${prop}_unit`]}`;
            }
            el.textContent = value;
        });

        // Изменение иконки погоды
        const weatherSymbol = this.el.querySelector('[data-symbol]');
        if (weatherSymbol) {
            switch(this.weather.kind.toLowerCase()) {
                case 'солнечно':
                case 'sunny':
                    weatherSymbol.setAttribute('href', '#sunny');
                    break;
                // Добавьте другие кейсы для разных типов погоды
                default:
                    weatherSymbol.setAttribute('href', '#sunny');
            }
        }
    }

    setupToggle() {
        const summary = this.el.querySelector('summary');
        summary.addEventListener('click', () => {
            this.el.open = !this.el.open;
        });
    }
}

// Обработка форм
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');

    if(contactForm){
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Получение данных формы
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => (data[key] = value));

            // Здесь вы можете добавить код для отправки данных на сервер

            // Очистка формы и сообщение об успешной отправке
            contactForm.reset();
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        });
    }

    if(newsletterForm){
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Получение данных формы
            const formData = new FormData(newsletterForm);
            const email = formData.get('newsletter-email');

            // Здесь вы можете добавить код для добавления email в рассылку

            // Очистка формы и сообщение об успешной подписке
            newsletterForm.reset();
            alert('Спасибо за подписку! Вы будете получать наши новости.');
        });
    }
});

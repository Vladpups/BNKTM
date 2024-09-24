// Инициализация AOS
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 1000,
        once: true
    });

    // Остальные скрипты
    // Кнопка "Наверх"
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Автообновление года в футере
    document.getElementById('year').textContent = new Date().getFullYear();

    // Lazy Loading видео
    let lazyVideos = [].slice.call(document.querySelectorAll("iframe"));

    if ("IntersectionObserver" in window) {
        let lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(video) {
                if (video.isIntersecting) {
                    video.target.src = video.target.dataset.src;
                    lazyVideoObserver.unobserve(video.target);
                }
            });
        });

        lazyVideos.forEach(function(video) {
            lazyVideoObserver.observe(video);
        });
    } else {
        // Фолбэк для браузеров, не поддерживающих IntersectionObserver
        lazyVideos.forEach(function(video) {
            video.src = video.dataset.src;
        });
    }

    // Обработка отправки формы через Formspree
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Простая валидация формы
        const name = this.name.value.trim();
        const email = this._replyto.value.trim();
        const message = this.message.value.trim();

        if (name && email && message) {
            // Отправка данных через Formspree
            const formData = new FormData(this);
            fetch(this.action, {
                method: this.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    document.getElementById('form-message').textContent = 'Спасибо! Ваше сообщение отправлено.';
                    this.reset();
                } else {
                    response.json().then(data => {
                        if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
                            document.getElementById('form-message').textContent = data.errors.map(error => error.message).join(', ');
                        } else {
                            document.getElementById('form-message').textContent = 'Что-то пошло не так. Пожалуйста, попробуйте еще раз.';
                        }
                    });
                }
            })
            .catch(error => {
                document.getElementById('form-message').textContent = 'Что-то пошло не так. Пожалуйста, попробуйте еще раз.';
            });
        } else {
            // Показать сообщение об ошибке
            document.getElementById('form-message').textContent = 'Пожалуйста, заполните все поля.';
        }
    });

    // Обработка формы подписки на новости
    document.getElementById('newsletter-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.email.value.trim();

        if (email) {
            // Здесь вы можете добавить логику для отправки email на ваш сервер или сервис рассылки
            document.getElementById('newsletter-message').textContent = 'Спасибо за подписку!';
            this.reset();
        } else {
            document.getElementById('newsletter-message').textContent = 'Пожалуйста, введите корректный email.';
        }
    });

    // Обработка гамбургер-меню
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Переключение иконок гамбургера
        const bars = hamburger.querySelector('.fas.fa-bars');
        const times = hamburger.querySelector('.fas.fa-times');
        if (hamburger.classList.contains('active')) {
            bars.style.display = 'none';
            times.style.display = 'block';
        } else {
            bars.style.display = 'block';
            times.style.display = 'none';
        }
    });

    // Фильтрация статей блога
    const filterButtons = document.querySelectorAll('.filter-button');
    const blogItems = document.querySelectorAll('.blog-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем класс 'active' со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем класс 'active' к текущей кнопке
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            blogItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

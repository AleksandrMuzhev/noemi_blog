document.addEventListener('DOMContentLoaded', function () {
    // Бургер-меню
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden'; // Блокируем скролл при открытом меню
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = 'auto'; // Возвращаем скролл
            }
        });
    }

    // Плавная прокрутка для навигации
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Закрываем меню на мобильных
                if (window.innerWidth <= 768 && nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (menuToggle) {
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    document.body.style.overflow = 'auto';
                }

                // Плавная прокрутка
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Модальное окно
    const modal = document.getElementById('subscribeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const newsletterForm = document.getElementById('newsletterForm');
    const modalForm = document.getElementById('modalForm');

    // Открытие модалки при отправке формы рассылки
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter__input').value;

            if (email && modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';

                // Автозаполнение email в модалке
                const modalEmailInput = modalForm.querySelector('input[type="email"]');
                if (modalEmailInput) {
                    modalEmailInput.value = email;
                }
            }
        });
    }

    // Закрытие модалки
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Закрытие по ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Обработка формы в модалке
    if (modalForm) {
        modalForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const email = formData.get('email');
            const name = formData.get('name') || 'пользователь';

            // Простая валидация
            if (!email || !email.includes('@')) {
                alert('Пожалуйста, введите корректный email адрес');
                return;
            }

            // Эмуляция отправки
            console.log('Отправка формы:', { email, name });

            alert(`Спасибо, ${name}! Вы успешно подписались на рассылку.`);

            closeModal();
            this.reset();

            // Очистка формы в сайдбаре
            if (newsletterForm) {
                newsletterForm.reset();
            }
        });
    }

    // Активное состояние для тегов
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function (e) {
            e.preventDefault();
            const tagText = this.textContent;
            console.log('Выбран тег:', tagText);
            // Можно добавить фильтрацию контента по тегу
        });
    });

    // Проверка изображений баннера
    function checkBannerImages() {
        console.log('Проверка изображений баннера...');

        // Проверяем существование файлов
        const imagesToCheck = [
            'img/banner-bg.jpg',
            'img/banner-bg-tablet.jpg',
            'img/banner-mobile.jpg'
        ];

        imagesToCheck.forEach(imgSrc => {
            const img = new Image();
            img.onload = function () {
                console.log(`✓ ${imgSrc} загружен успешно`);
            };
            img.onerror = function () {
                console.warn(`✗ ${imgSrc} не найден`);
            };
            img.src = imgSrc;
        });
    }

    // Инициализация при загрузке
    checkBannerImages();

    // Проверяем, правильно ли установлен фон баннера
    const headerBanner = document.querySelector('.header__banner');
    if (headerBanner) {
        console.log('Баннер найден, стили:', {
            backgroundImage: window.getComputedStyle(headerBanner).backgroundImage,
            height: headerBanner.offsetHeight
        });
    }

    // Функция для динамической подгрузки правильного изображения
    function updateBannerForScreenSize() {
        const banner = document.querySelector('.header__banner');
        if (!banner) return;

        const screenWidth = window.innerWidth;
        let imageUrl = 'img/banner-bg.jpg'; // по умолчанию

        if (screenWidth <= 768) {
            imageUrl = 'img/banner-mobile.jpg';
        } else if (screenWidth <= 1024) {
            imageUrl = 'img/banner-bg-tablet.jpg';
        }

        // Устанавливаем фон
        banner.style.backgroundImage = `url('${imageUrl}')`;
        console.log(`Установлен фон баннера: ${imageUrl} для ширины ${screenWidth}px`);
    }

    // Вызываем при загрузке и изменении размера
    updateBannerForScreenSize();
    window.addEventListener('resize', updateBannerForScreenSize);

    // Добавление текущего года в футер (если нужно)
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // Логирование для отладки
    console.log('Скрипт инициализирован. Элементы:');
    console.log('- Бургер меню:', menuToggle ? 'найден' : 'не найден');
    console.log('- Навигация:', nav ? 'найдена' : 'не найдена');
    console.log('- Баннер:', headerBanner ? 'найден' : 'не найден');
    console.log('- Модальное окно:', modal ? 'найдено' : 'не найдено');
});
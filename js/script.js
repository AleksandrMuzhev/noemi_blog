const BODY = document.body;

/*
  ОТКРЫТИЕ И ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ
*/

const toggleMobileMenu = () => {
    const hamburgerButton = document.querySelector(".nav--primary__hamburger");
    const navMenu = document.querySelector(".nav--primary");

    hamburgerButton.addEventListener("click", () => {
        BODY.classList.toggle("body-open-nav");
        navMenu.classList.toggle("nav--primary-open");
    });
}

/*
  ОТКРЫТИЕ И ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
*/

const openCloseModal = () => {
    const modal = document.querySelector(".modal");
    const modalOverlay = document.querySelector(".modal__overlay");
    const modalButtonClose = document.querySelector(".modal__btn-close");

    const removeModalClasses = () => {
        document.body.classList.remove("body-modal-open");
        modal.classList.remove("modal--open");

        localStorage.setItem("modalLastClosed", Date.now());
    };

    const shouldShowModal = () => {
        const lastClosed = localStorage.getItem("modalLastClosed");
        if (!lastClosed) return true;

        const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;
        return (Date.now() - lastClosed) > twoDaysInMilliseconds;
    };

    // Открытие модального окна при выходе мыши за пределы экрана в ПК-версиях
    document.addEventListener("mouseleave", e => {
        if (e.clientY < 0 && shouldShowModal()) {
            document.body.classList.add("body-modal-open");
            modal.classList.add("modal--open");
        }
    });

    // Открытие модального окна при нажатии на экран
    document.addEventListener("touchstart", e => {
        if (shouldShowModal()) {
            document.body.classList.add("body-modal-open");
            modal.classList.add("modal--open");
        }
    });

    modalButtonClose.addEventListener("click", removeModalClasses);
    modalOverlay.addEventListener("click", removeModalClasses);
};

/*
  ОБРАБОТКА СОБЫТИЙ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
*/

document.addEventListener("DOMContentLoaded", () => {
    toggleMobileMenu();
    openCloseModal();
});
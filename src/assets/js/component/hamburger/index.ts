export const hamburger = () => {
    const hamburgerBtn = document.querySelector('.header_menu__btn');
    const nav = document.querySelector('.hamburger_block');
    const header = document.querySelector('.header_block');
    const headerLogos = document.querySelectorAll('.header_block__logo img') as NodeListOf<HTMLImageElement>;

    const body = document.body;

    if (hamburgerBtn && nav && header && headerLogos) {
        hamburgerBtn.addEventListener('click', () => {
            nav.classList.toggle('is-open');
            hamburgerBtn.classList.toggle('is-active');
            header.classList.toggle('is-active');

            for (const headerLogo of headerLogos) {
                if (nav.classList.contains('is-open')) {
                    headerLogo.src = '/assets/img/common/logo_white.svg';
                    body.style.overflow = 'hidden';
                } else {
                    headerLogo.src = '/assets/img/common/logo_black.svg';
                    body.style.overflow = '';
                }
            }
        });
    }
}

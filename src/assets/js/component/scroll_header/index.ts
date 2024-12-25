export const ScrollHeader = () => {
    if (!document.querySelector('.index_page')) return;

    const header = document.querySelector('.header_block') as HTMLElement;
    const headerLogo = document.querySelector('.header_block__logo img') as HTMLImageElement;

    if (!header) return;

    const handleScrollAndResize = () => {
        if (window.innerWidth <= 769) {
            window.removeEventListener('scroll', handleScrollAndResize);
            header.classList.remove('scrolled'); // スクロール解除時に元の状態に戻す
        } else {
            window.addEventListener('scroll', handleScrollAndResize);
            if (window.scrollY > 500) {
                header.classList.add('scrolled');
                headerLogo.src = '/assets/img/common/logo_black.svg';
            } else {
                header.classList.remove('scrolled');
                headerLogo.src = '/assets/img/common/logo_white.svg';
            }
        }
    };

    // 初期状態の確認とイベントリスナーの設定
    handleScrollAndResize();
    window.addEventListener('resize', handleScrollAndResize);

}
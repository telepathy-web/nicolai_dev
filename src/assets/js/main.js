import scrollAnimations from './component/scroll_animation';

document.addEventListener('DOMContentLoaded', () => {
    new scrollAnimations().add(document.querySelectorAll('[data-anim-elm]'));
})
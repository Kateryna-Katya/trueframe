document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-button');
  const menu = document.querySelector('#mobileMenu');
  const icon = menuBtn.querySelector('.icon');
  const links = document.querySelectorAll('.menu-list a');

  let isOpen = false;

  const burger = `<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.16663 6.45833H25.8333M5.16663 15.5H25.8333M5.16663 24.5417H25.8333" stroke="#151515" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`; // твій svg
  const close = `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M34.1666 34.1667L6.83325 6.83333M34.1666 6.83333L6.83325 34.1667" stroke="#364153" stroke-width="2" stroke-linecap="round" />
</svg>`;

  menuBtn.addEventListener('click', () => {
    isOpen = !isOpen;

    menu.classList.toggle('is-open');
    document.body.classList.toggle('no-scroll');

    icon.innerHTML = isOpen ? close : burger;
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      icon.innerHTML = burger;
      isOpen = false;
    });
  });
});
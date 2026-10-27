// Чекаємо, поки весь HTML-документ повністю завантажиться
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. ОДЕРЖАННЯ ЕЛЕМЕНТІВ З HTML (DOM)
  // ==========================================
  const openModalBtns = document.querySelectorAll('.js-open-modal');
  const modal = document.getElementById('booking-modal');
  const closeModalBtn = document.querySelector('.modal-close');
  const overlay = document.querySelector('.modal-overlay');
  const bookingForm = document.getElementById('bookingForm');
  
  const burgerBtn = document.getElementById('burger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');


  // ==========================================
  // 2. УПРАВЛІННЯ МОДАЛЬНИМ ВІКНОМ (OPEN/CLOSE)
  // ==========================================
  
  // Функція відкриття вікна
  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Забороняємо прокрутку сторінки під вікном
  };

  // Функція закриття вікна
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Повертаємо прокрутку
  };

  // Надаємо дію "відкрити" усім кнопкам з класом .js-open-modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // Закриття при натисканні на хрестик
  closeModalBtn.addEventListener('click', closeModal);

  // Закриття при натисканні на темний фон поза вікном
  overlay.addEventListener('click', closeModal);

  // Закриття при натисканні клавіші Esc на клавіатурі
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });


  // ==========================================
  // 3. МОБІЛЬНЕ МЕНЮ (БОРГЕР-МЕНЮ)
  // ==========================================
  burgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Закривати мобільне меню при кліку на будь-яке посилання
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });


  // ==========================================
  // 4. ОБРОБКА ВІДПРАВКИ ФОРМИ ЗАПИСУ
  // ==========================================
  bookingForm.addEventListener('submit', (e) => {
    // Скасовуємо перезавантаження сторінки
    e.preventDefault();

    // Зчитуємо дані, які ввів користувач
    const userName = document.getElementById('name').value;
    const userPhone = document.getElementById('phone').value;
    const selectedService = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;

    // Показуємо повідомлення про успіх
    alert(`Дякуємо, ${userName}!\nВаша заявка на послугу "${selectedService}" прийнята.\nМи зв'яжемося з вами за контактом: ${userPhone}`);

    // Очищаємо поля форми та закриваємо модальне вікно
    bookingForm.reset();
    closeModal();
  });


  // ==========================================
  // 5. ПІДСВІЧУВАННЯ АКТИВНИХ ПУНКТІВ МЕНЮ
  // ==========================================
  window.addEventListener('scroll', () => {
    let currentSection = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= (sectionTop - 150)) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {
  /* =============================
     🌀 Carrusel de Testimonios
  ============================== */
  const testimonialsSwiper = new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true, // arrastre con el mouse
    mousewheel: false, // desactivar scroll por rueda
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  /* =============================
     💬 Envío de nuevas reseñas
  ============================== */
  const form = document.getElementById("submitReviewForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const role = document.getElementById("role").value.trim();
      const comment = document.getElementById("comment").value.trim();

      if (!name || !role || !comment) {
        alert("Por favor, completa todos los campos antes de enviar tu reseña.");
        return;
      }

      const newSlide = document.createElement("div");
      newSlide.classList.add(
        "swiper-slide",
        "bg-white",
        "p-6",
        "rounded-lg",
        "shadow",
        "transition",
        "hover:shadow-lg"
      );
      newSlide.innerHTML = `
        <p class="mb-4 text-gray-700 italic">"${comment}"</p>
        <p class="font-semibold text-gray-900">${name}</p>
        <p class="text-gray-500 text-sm">${role}</p>
      `;

      testimonialsSwiper.appendSlide(newSlide);
      testimonialsSwiper.update();

      form.reset();
      alert("✅ ¡Gracias por tu reseña!");
    });
  }

  /* =============================
     📱 Mensaje para botones de descarga
  ============================== */
  const appStoreBtn = document.getElementById("appStoreBtn");
  const googlePlayBtn = document.getElementById("googlePlayBtn");

  const showMessage = (platform) => {
    alert(`🚧 Estamos trabajando en la versión de ${platform}. ¡Pronto estará disponible!`);
  };

  if (appStoreBtn) {
    appStoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showMessage("App Store");
    });
  }

  if (googlePlayBtn) {
    googlePlayBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showMessage("Google Play");
    });
  }
});

import { saveReview, getReviews } from "./firebase.js";

document.addEventListener("DOMContentLoaded", async () => {
  const reviewsContainer = document.getElementById("reviewsContainer");
  const form = document.getElementById("submitReviewForm");
  const message = document.getElementById("reviewMessage");

  /* ==============================
     🌀 Inicializar Swiper
  ============================== */
  const testimonialsSwiper = new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  /* ==============================
     💾 Cargar reseñas desde Firebase
  ============================== */
  const loadReviews = async () => {
    const response = await getReviews();
    if (response.status === "success") {
      const reviews = Object.values(response.data);
      reviewsContainer.innerHTML = "";
      testimonialsSwiper.removeAllSlides(); // Limpiar el swiper antes de agregar

      reviews.forEach((review) => {
        const slide = document.createElement("div");
        slide.classList.add(
          "swiper-slide",
          "bg-white",
          "p-6",
          "rounded-lg",
          "shadow",
          "hover:shadow-lg",
          "transition"
        );
        slide.innerHTML = `
          <p class="mb-4 text-gray-700 italic">"${review.comment}"</p>
          <p class="font-semibold text-gray-900">${review.name}</p>
          <p class="text-gray-500 text-sm">${review.role}</p>
        `;
        testimonialsSwiper.appendSlide(slide);
      });

      testimonialsSwiper.update();
    } else {
      reviewsContainer.innerHTML = "<p class='text-center text-gray-500'>No hay reseñas disponibles.</p>";
    }
  };

  await loadReviews();

  /* ==============================
     📨 Enviar nueva reseña
  ============================== */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value.trim();
    const comment = document.getElementById("comment").value.trim();

    if (!name || !role || !comment) {
      alert("⚠️ Por favor, completa todos los campos antes de enviar tu reseña.");
      return;
    }

    message.textContent = "✨ Enviando reseña...";
    message.classList.remove("hidden");

    const response = await saveReview(name, role, comment);

    if (response.status === "success") {
      message.textContent = "✅ ¡Gracias por tu reseña!";
      form.reset();
      await loadReviews();
    } else {
      message.textContent = "❌ Error al enviar reseña. Inténtalo nuevamente.";
    }

    setTimeout(() => {
      message.classList.add("hidden");
    }, 3000);
  });

  /* ==============================
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

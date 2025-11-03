document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true, // Permite arrastrar con el mouse
    mousewheel: false, // opcional, si quieres scroll con la rueda
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  const form = document.getElementById('submitReviewForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const comment = document.getElementById('comment').value;

    const newSlide = document.createElement('div');
    newSlide.classList.add('swiper-slide', 'bg-white', 'p-6', 'rounded-lg', 'shadow');
    newSlide.innerHTML = `
      <p class="mb-4">"${comment}"</p>
      <p class="font-semibold">${name}</p>
      <p class="text-gray-500 text-sm">${role}</p>
    `;

    swiper.appendSlide(newSlide);
    swiper.update();

    form.reset();
    alert("¡Gracias por tu reseña!");
  });
});

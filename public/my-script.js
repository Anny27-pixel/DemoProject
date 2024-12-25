document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const leftBtn = document.querySelector('.carousel-btn.left');
  const rightBtn = document.querySelector('.carousel-btn.right');
  const pagination = document.querySelector('.pagination');
  let currentIndex = 0;
  let autoRotationInterval; // Variable to store the interval ID

  fetch('/api/carousel-data')
    .then(response => response.json())
    .then(data => {
      const numCards = data.length;

      data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="photos/${item.photo}" alt="${item.title}">
          <div class="text-overlay">
            <h3>${item.title}:</h3>
            <p>${item.description.split(" ").slice(0, 20).join(" ") + "..."}</p>
          </div>
        `;
        carousel.appendChild(card);
      });

      // Create numbered pagination items
      for (let i = 0; i < numCards; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.classList.add('page-number');
        pageNumber.dataset.index = i;
        pageNumber.textContent = i + 1;
        pagination.appendChild(pageNumber);
      }

      const updateCarousel = () => {
        const cards = carousel.querySelectorAll('.card');

        cards.forEach((card, index) => {
          card.classList.remove('left', 'center', 'right');

          let pos = (index - currentIndex + numCards) % numCards;

          if (pos === 0) {
            card.classList.add('center');
          } else if (pos === 1) {
            card.classList.add('right');
          } else if (pos === numCards - 1 || pos === 2) {
            card.classList.add('left');
          }
        });

        const centerCard = carousel.querySelector('.card.center');
        if (centerCard) {
          const centerIndex = Array.from(cards).indexOf(centerCard);
          carousel.style.transform = `translateX(-${(centerIndex - 1) * (300 + 20)}px)`;
        }

        // Update active page number
        const activePage = pagination.querySelector('.page-number.active');
        if (activePage) {
          activePage.classList.remove('active');
        }
        pagination.querySelector(`.page-number[data-index="${currentIndex}"]`).classList.add('active');
      };

      rightBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % numCards;
        updateCarousel();
      });

      leftBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + numCards) % numCards;
        updateCarousel();
      });

      pagination.addEventListener('click', (event) => {
        if (event.target.classList.contains('page-number')) {
          currentIndex = parseInt(event.target.dataset.index, 10);
          updateCarousel();
        }
      });

      // Auto-rotation functionality
      const startAutoRotation = (interval = 5000) => { // Default interval is 5 seconds
        autoRotationInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % numCards;
          updateCarousel();
        }, interval);
      };

      const stopAutoRotation = () => {
        clearInterval(autoRotationInterval);
        autoRotationInterval = null;
      };

      // Start auto-rotation by default
      startAutoRotation();

      // You can add controls to start/stop auto-rotation
      // For example:
      // const autoRotateBtn = document.getElementById('autoRotateBtn');
      // autoRotateBtn.addEventListener('click', () => {
      //   if (autoRotationInterval) {
      //     stopAutoRotation();
      //   } else {
      //     startAutoRotation();
      //   }
      // });

      updateCarousel();
    });
});

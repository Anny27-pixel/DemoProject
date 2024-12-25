document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const leftBtn = document.querySelector('.carousel-btn.left');
    const rightBtn = document.querySelector('.carousel-btn.right');
    let currentIndex = 0;

    fetch('/api/carousel-data')
        .then(response => response.json())
        .then(data => {
            const numCards = data.length; // Store the number of cards

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

            const updateCarousel = () => {
                const cards = carousel.querySelectorAll('.card');

                cards.forEach((card, index) => {
                    card.classList.remove('left', 'center', 'right');

                    let pos = (index - currentIndex + numCards) % numCards; // Corrected modulo calculation

                    if (pos === 0) {
                        card.classList.add('center');
                    } else if (pos === 1) {
                        card.classList.add('right');
                    } else if (pos === 2 || pos === numCards -1) { // Corrected left card logic
                        card.classList.add('left');
                    }
                });


                const centerCard = carousel.querySelector('.card.center');
                if (centerCard) {
                    const centerIndex = Array.from(cards).indexOf(centerCard);
                    carousel.style.transform = `translateX(-${(centerIndex - 1) * (300 + 20)}px)`;
                }

            };

            rightBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % numCards;
                updateCarousel();
            });

            leftBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + numCards) % numCards;
                updateCarousel();
            });

            updateCarousel(); // Initial call
        });
});
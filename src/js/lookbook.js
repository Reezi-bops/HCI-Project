// --- Lookbook Image Track ---
const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for (const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
};

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = () => handleOnUp();
window.ontouchend = () => handleOnUp();
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);

// --- Menu Background Hover Effects ---
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const menuToggle = document.getElementById("menu-toggle");

  Array.from(document.getElementsByClassName("menu-item")).forEach((item, index) => {
    item.onmouseover = () => {
      menu.dataset.activeIndex = index;
    };
  });
});

// --- WISHLIST MODAL ---
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('wishlistModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = modal.querySelector('.close');
  const modalContent = modal.querySelector('.modal-content');

  // --- OPEN MODAL ---
  openModalBtn?.addEventListener('click', () => {
    renderWishlist();
    modal.classList.add('show');
    document.body.classList.add('modal-open'); // optional: to prevent background scrolling
  });

  // --- CLOSE MODAL BUTTON ---
  closeModalBtn?.addEventListener('click', closeModal);

  // --- CLOSE MODAL ON OUTSIDE CLICK ---
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // --- ESC KEY TO CLOSE ---
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  }
});

// --- RENDER WISHLIST (TEMPLATE) ---
function renderWishlist() {
  const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
  const container = document.getElementById('wishlistItems');
  const template = document.getElementById('wishlistItemTemplate');

  container.innerHTML = '';

  if (wishlist.length === 0) {
      container.innerHTML = '<p class="empty-message">Your wishlist is empty.</p>';
      return;
  }

  wishlist.forEach((item, index) => {
      const clone = template.content.cloneNode(true);
      const img = clone.querySelector('img');
      const namePrice = clone.querySelector('.wishlist-name-price');
      const removeBtn = clone.querySelector('.remove-wishlist-btn');

      img.src = item.image;
      img.alt = item.name;
      namePrice.textContent = `${item.name} - ${item.price}`;
      removeBtn.dataset.index = index;

      removeBtn.addEventListener('click', () => {
          removeFromWishlist(index);
      });

      container.appendChild(clone);
  });
}

// --- REMOVE FROM WISHLIST ---
function removeFromWishlist(index) {
  const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
  wishlist.splice(index, 1);
  localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
  renderWishlist();
}

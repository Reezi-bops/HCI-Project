
  const cartBadge = document.getElementById('cart-count');
  const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartBadge.textContent = cart.reduce((acc, item) => acc + (item.qty || 0), 0);

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

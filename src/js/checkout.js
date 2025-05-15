// --- PRODUCT QUANTITY ---
function updateQty(change) {
  const qtyEl = document.getElementById('qty');
  let qty = parseInt(qtyEl.innerText);
  qty += change;
  if (qty < 1) qty = 0;
  qtyEl.innerText = qty;
}

// --- PRODUCT SIZE SELECTION ---
function selectSize(button) {
  const buttons = document.querySelectorAll('.sizes button');
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

// --- ADD TO WISHLIST ---
function addToWishlist(name, image, price,) {
  let wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
  if (!wishlist.some(item => item.name === name)) {
      wishlist.push({ name, image, price });
      localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
  }
}
// --- DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
  const product = JSON.parse(localStorage.getItem('selectedProduct'));
  if (product) {
      document.querySelector('.product-info h1').innerText = product.name;
      document.querySelector('.price').innerText = product.price;
      document.querySelector('.image-container').style.backgroundImage = `url('${product.image}')`;
    }

  const cartBadge = document.getElementById('cart-count');
  const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartBadge.textContent = cart.reduce((acc, item) => acc + (item.qty || 0), 0);

  const modal = document.getElementById('wishlistModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = modal.querySelector('.close');

  // --- OPEN MODAL ---
  openModalBtn.addEventListener('click', () => {
      renderWishlist();
      modal.classList.add('show');
  });

  // --- CLOSE MODAL BUTTON ---
  closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('show');
  });

  // --- CLOSE MODAL OUTSIDE ---
  window.addEventListener('click', (e) => {
      if (e.target === modal) {
          modal.classList.remove('show');
      }
  });

  // --- ADD TO CART ---
  document.querySelector('.add-to-cart').addEventListener('click', () => {
      if (!product) return alert('No product found!');
      const sizeBtn = document.querySelector('.sizes button.active');
      const size = sizeBtn ? sizeBtn.innerText : null;
      const qty = parseInt(document.getElementById('qty').innerText);

      if (!size) return alert('Please select a size.');
      if (qty < 1) return alert('Please select quantity.');

      const cartItem = { name: product.name, price: product.price, image: product.image, size, qty };
      let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
      cart.push(cartItem);
      localStorage.setItem('cartItems', JSON.stringify(cart));

      cartBadge.textContent = cart.reduce((acc, item) => acc + (item.qty || 0), 0);
      window.location.href = 'cart.html';
  });
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
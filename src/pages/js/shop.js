const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const searchInput = document.querySelector('.search-container input');
const modal = document.getElementById("wishlistModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.querySelector(".close");

let currentCategory = 'all';
let searchQuery = '';

// --- Helper: Get Wishlist ---
function getWishlist() {
  return JSON.parse(localStorage.getItem('wishlistItems')) || [];
}

// --- Filter & Search ---
function updateFilters() {
  productCards.forEach(card => {
    const categories = card.getAttribute('data-category')?.split(',').map(c => c.trim().toLowerCase()) || [];
    const title = card.querySelector('h3')?.textContent.toLowerCase();
    const categoryMatch = currentCategory === 'all' || categories.includes(currentCategory);
    const searchMatch = !searchQuery || title.includes(searchQuery);

    card.style.display = (categoryMatch && searchMatch) ? '' : 'none';
  });
}

// --- Buy Product ---
function buyProduct(name, image, price) {
  const product = { name, image, price };
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = 'checkout.html';
}

// --- Wishlist ---
function addToWishlist(name, image, price) {
  let wishlist = getWishlist();
  if (!wishlist.find(item => item.name === name)) {
    wishlist.push({ name, image, price });
  }
  localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
}

function renderWishlist() {
  let wishlist = getWishlist();
  const container = document.getElementById('wishlistItems');
  container.innerHTML = '';

  if (wishlist.length === 0) {
    container.innerHTML = '<p>Your wishlist is empty.</p>';
    return;
  }

  wishlist.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('wishlist-item');
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">
      <strong>${item.name}</strong> - ${item.price}
    `;
    container.appendChild(div);
  });
}

// --- Cart Count ---
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const count = cart.reduce((acc, item) => acc + (item.qty || 0), 0);
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = count;
  }
}

// --- Init Filter ---
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.getAttribute('data-filter').toLowerCase();
    updateFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    updateFilters();
  });
}

// --- Wishlist Modal ---
openModalBtn.onclick = function() {
  renderWishlist();
  modal.style.display = "block";
}

closeModalBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// --- Fav Button Bindings ---
document.querySelectorAll('.fav-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const name = productCard.getAttribute('data-name');
    const image = productCard.getAttribute('data-image');
    const price = productCard.getAttribute('data-price');
    addToWishlist(name, image, price);
    alert(`${name} added to your wishlist!`);
  });
});

// --- Init ---
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

function removeFromWishlist(index) {
  const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
  wishlist.splice(index, 1);
  localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
  renderWishlist();
}

updateFilters();
updateCartCount();
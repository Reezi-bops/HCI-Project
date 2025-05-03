    // ——— CART HANDLERS ———
    const tbody = document.querySelector('tbody');
    const totalEl = document.getElementById('cart-total');
    const shippingFeeEl = document.getElementById('shipping-fee');
    const cartCount = document.getElementById('cart-count');

    function loadCart() {
      const cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      tbody.innerHTML = '';
      let subtotal = 0;
      if (!cart.length) {
        tbody.innerHTML = '<tr><td colspan="3">Your cart is empty.</td></tr>';
        shippingFeeEl.style.display = 'none';
      } else {
        shippingFeeEl.style.display = 'flex';
        cart.forEach((item, i) => {
          const itemTotal = parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.qty;
          subtotal += itemTotal;
          tbody.innerHTML += `
            <tr>
              <td>
                <div class="product">
                  <div class="product-image" style="background-image:url('${item.image}');"></div>
                  <div>
                    <p><strong>${item.name}</strong></p>
                    ${item.size ? `<p>Size: ${item.size}</p>` : ''}
                    <button class="remove-btn" data-index="${i}">Remove</button>
                  </div>
                </div>
              </td>
              <td>
                <div class="quantity">
                  <button onclick="updateQty(${i}, -1)">−</button>
                  <span>${item.qty}</span>
                  <button onclick="updateQty(${i}, 1)">+</button>
                </div>
              </td>
              <td>PHP ${itemTotal.toLocaleString()}</td>
            </tr>`;
        });
      }
      const fee = cart.length ? 50 : 0;
      totalEl.textContent = `PHP ${(subtotal + fee).toLocaleString()}`;
      cartCountBadge(cart);
      document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', e => removeItem(+e.target.dataset.index));
      });
    }

    function cartCountBadge(cart) {
      const count = cart.reduce((sum, i) => sum + i.qty, 0);
      cartCount.innerText = count;
      cartCount.style.display = count ? 'inline' : 'none';
    }

    function updateQty(i, delta) {
      const cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      if (!cart[i]) return;
      cart[i].qty = Math.max(1, cart[i].qty + delta);
      localStorage.setItem('cartItems', JSON.stringify(cart));
      loadCart();
    }

    function removeItem(i) {
      const cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      cart.splice(i, 1);
      localStorage.setItem('cartItems', JSON.stringify(cart));
      loadCart();
    }

    // ——— WISHLIST HANDLERS ———
    function getWishlist() {
      return JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    }

    function saveWishlist(w) {
      localStorage.setItem('wishlistItems', JSON.stringify(w));
    }

    function addToWishlist(name, image, price) {
      const list = getWishlist();
      if (!list.some(x => x.name === name)) {
        list.push({ name, image, price });
        saveWishlist(list);
      }
    }

    function removeFromWishlist(i) {
      const list = getWishlist();
      list.splice(i, 1);
      saveWishlist(list);
      renderWishlist();
    }

    function renderWishlist() {
      const container = document.getElementById('wishlistItems');
      const list = getWishlist();
      const tpl = document.getElementById('wishlistItemTemplate').content;
      container.innerHTML = '';
      if (!list.length) {
        container.innerHTML = '<p class="empty-message">Your wishlist is empty.</p>';
        return;
      }
      list.forEach((item, i) => {
        const cl = tpl.cloneNode(true);
        cl.querySelector('img').src = item.image;
        cl.querySelector('img').alt = item.name;
        cl.querySelector('.wishlist-name').innerText = item.name;
        cl.querySelector('.wishlist-price').innerText = item.price;
        cl.querySelector('.remove-wishlist-btn').addEventListener('click', () => removeFromWishlist(i));
        container.appendChild(cl);
      });
    }

    // ——— MODAL HELPERS ———
    function openModal(el) { el.style.display = 'block'; }
    function closeModal(el) { el.style.display = 'none'; }

    // ——— INITIALIZE ———
    document.addEventListener('DOMContentLoaded', () => {
      loadCart();

      const wishModal = document.getElementById('wishlistModal');
      document.getElementById('openModalBtn').onclick = () => { renderWishlist(); openModal(wishModal); };
      wishModal.querySelector('.close').onclick = () => closeModal(wishModal);
      window.onclick = e => { if (e.target === wishModal) closeModal(wishModal); };

      document.querySelectorAll('.place-order').forEach(btn => 
        btn.addEventListener('click', () => openModal(document.getElementById('paymentModal')))
      );

      document.getElementById('paymentForm').addEventListener('submit', e => {
        e.preventDefault();
        localStorage.removeItem('cartItems');
        closeModal(document.getElementById('paymentModal'));
        openModal(document.getElementById('successModal'));
      });

      document.querySelectorAll('.fav-btn').forEach(btn => 
        btn.addEventListener('click', e => {
          const c = e.target.closest('.product-card');
          addToWishlist(c.dataset.name, c.dataset.image, c.dataset.price);
          alert(`${c.dataset.name} added!`);
        })
      );
    });
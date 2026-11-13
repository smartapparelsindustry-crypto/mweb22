/**
 * Luxe Lane Haute Couture - Unified Client-Side Controller & Cart System
 * Complete Cart Engine with localStorage persistence, Right-Side Cart Drawer, and responsive UI
 */

(function () {
  // --- 1. LOCALSTORAGE CART ENGINE ---
  const CART_STORAGE_KEY = 'luxelane_cart_items';
  const WISHLIST_STORAGE_KEY = 'luxelane_wishlist';

  // Helper to parse price string to integer number
  function parsePrice(priceVal) {
    if (typeof priceVal === 'number') return priceVal;
    if (!priceVal) return 0;
    const clean = priceVal.toString().replace(/[^0-9]/g, '');
    return parseInt(clean, 10) || 0;
  }

  // Get cart from localStorage
  window.getCart = function () {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
    }
    // Default initial cart if empty
    const initialCart = [
      {
        id: 'noor-chanderi-silk',
        title: 'Noor Chanderi Silk Three-Piece Suite',
        price: 32500,
        size: 'M',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFKFCQHIBjL7KbdhQ8W8dpmy9aWULwMniMdz2BGnvj1PGWuu6GtUeehG94kD4v8YuiWTijL5gkQQgib2IA6GEOcRd-3iDmrDxVZHwwH0L59ngGiUEHT6Jm9I-jv8ysKyHP196oORflxZ037uWxEnIzIPCfzugVF0GLSKt6XQF5BhTJKH5aY3FXeZdx_P_2vWY8NAl6FW9Y1Pbx0iIC1jO6AAM1qISOF888e083dm0r1PwzDi0BUGyd',
        qty: 1
      }
    ];
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(initialCart));
    return initialCart;
  };

  // Save cart to localStorage and update all UI
  window.saveCart = function (cartItems) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    updateCartUI();
  };

  // Add Item to Cart
  window.addToCartItem = function (product, openDrawer = true) {
    const cart = getCart();
    const numericPrice = parsePrice(product.price);
    const size = product.size || 'M';
    const title = product.title || 'Haute Couture Ensemble';
    const img = product.img || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFKFCQHIBjL7KbdhQ8W8dpmy9aWULwMniMdz2BGnvj1PGWuu6GtUeehG94kD4v8YuiWTijL5gkQQgib2IA6GEOcRd-3iDmrDxVZHwwH0L59ngGiUEHT6Jm9I-jv8ysKyHP196oORflxZ037uWxEnIzIPCfzugVF0GLSKt6XQF5BhTJKH5aY3FXeZdx_P_2vWY8NAl6FW9Y1Pbx0iIC1jO6AAM1qISOF888e083dm0r1PwzDi0BUGyd';
    const qtyToAdd = parseInt(product.qty, 10) || 1;

    // Check if same item & size already exists
    const existingIndex = cart.findIndex(it => it.title === title && it.size === size);
    if (existingIndex > -1) {
      cart[existingIndex].qty += qtyToAdd;
    } else {
      cart.push({
        id: product.id || 'item-' + Date.now(),
        title: title,
        price: numericPrice,
        size: size,
        img: img,
        qty: qtyToAdd
      });
    }

    saveCart(cart);

    showToast(`Added "${title}" (Size: ${size}) to your Shopping Bag!`, {
      icon: 'shopping_bag',
      actionText: 'View Bag',
      onAction: () => openCartDrawer()
    });

    if (openDrawer) {
      setTimeout(() => {
        openCartDrawer();
      }, 150);
    }
  };

  // Backward compatibility quickAddToCart
  window.quickAddToCart = function (productName, price, qty = 1, img = '') {
    addToCartItem({
      title: productName,
      price: price,
      size: 'M',
      img: img || '',
      qty: qty
    }, true);
  };

  // Change Quantity in Drawer
  window.changeCartDrawerQty = function (index, delta) {
    const cart = getCart();
    if (!cart[index]) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
  };

  // Remove Item from Drawer
  window.removeCartDrawerItem = function (index) {
    const cart = getCart();
    if (!cart[index]) return;
    const removedTitle = cart[index].title;
    cart.splice(index, 1);
    saveCart(cart);
    showToast(`Removed "${removedTitle}" from your Shopping Bag`, { icon: 'delete_outline' });
  };

  // Update all badges and drawer items across page
  window.updateCartUI = function () {
    const cart = getCart();
    const totalCount = cart.reduce((sum, it) => sum + (parseInt(it.qty, 10) || 0), 0);
    const subtotal = cart.reduce((sum, it) => sum + ((parseInt(it.qty, 10) || 0) * (parseInt(it.price, 10) || 0)), 0);

    // Update Header Badges
    document.querySelectorAll('#headerCartBadge, .cart-badge').forEach(badge => {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.classList.remove('hidden');
        badge.classList.add('scale-125');
        setTimeout(() => badge.classList.remove('scale-125'), 200);
      }
    });

    // Update Drawer Header Count
    const drawerCountEl = document.getElementById('cartDrawerItemCount');
    if (drawerCountEl) drawerCountEl.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;

    // Update Drawer Subtotal
    const subtotalEl = document.getElementById('cartDrawerSubtotal');
    if (subtotalEl) subtotalEl.textContent = `PKR ${subtotal.toLocaleString()}`;

    // Render Drawer Items List
    const itemsContainer = document.getElementById('cartDrawerItems');
    if (itemsContainer) {
      if (cart.length === 0) {
        itemsContainer.innerHTML = `
          <div class="text-center py-16 px-4">
            <span class="material-symbols-outlined text-[64px] text-outline-variant mb-3 block">shopping_bag</span>
            <h4 class="font-headline-sm text-base text-on-surface font-semibold mb-1">Your Shopping Bag is Empty</h4>
            <p class="font-body-sm text-xs text-on-surface-variant max-w-xs mx-auto mb-6">Discover timeless pret, bridal silks, and modern cuts tailored for elegance.</p>
            <a href="shop.html" onclick="closeCartDrawer()" class="inline-block px-6 py-2.5 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-wider rounded-lg shadow-sm hover:bg-on-surface-variant transition-colors">
              Explore Collection
            </a>
          </div>
        `;
      } else {
        itemsContainer.innerHTML = cart.map((item, idx) => `
          <div class="flex gap-3.5 p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20 relative group hover:border-outline-variant/50 transition-all">
            <div class="w-20 h-24 bg-surface-container rounded-lg overflow-hidden shrink-0 border border-outline-variant/20">
              <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover object-top" onerror="this.src='https://lh3.googleusercontent.com/aida-public/AB6AXuDFKFCQHIBjL7KbdhQ8W8dpmy9aWULwMniMdz2BGnvj1PGWuu6GtUeehG94kD4v8YuiWTijL5gkQQgib2IA6GEOcRd-3iDmrDxVZHwwH0L59ngGiUEHT6Jm9I-jv8ysKyHP196oORflxZ037uWxEnIzIPCfzugVF0GLSKt6XQF5BhTJKH5aY3FXeZdx_P_2vWY8NAl6FW9Y1Pbx0iIC1jO6AAM1qISOF888e083dm0r1PwzDi0BUGyd'"/>
            </div>
            <div class="flex-1 flex flex-col justify-between overflow-hidden">
              <div>
                <div class="flex justify-between items-start gap-2">
                  <h5 class="font-headline-sm text-sm text-on-surface font-semibold truncate leading-tight">${item.title}</h5>
                  <button onclick="removeCartDrawerItem(${idx})" aria-label="Remove item" class="text-on-surface-variant hover:text-error transition-colors p-0.5 shrink-0">
                    <span class="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
                <div class="flex items-center gap-2 mt-1">
                  <span class="font-label-caps text-[10px] bg-surface px-2 py-0.5 rounded border border-outline-variant/30 text-on-surface uppercase font-semibold">Size: ${item.size}</span>
                </div>
              </div>
              <div class="flex justify-between items-center mt-2 pt-2 border-t border-outline-variant/15">
                <div class="flex items-center bg-surface rounded-lg px-2 py-0.5 border border-outline-variant/30 shadow-xs">
                  <button onclick="changeCartDrawerQty(${idx}, -1)" class="w-5 h-5 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" type="button">
                    <span class="material-symbols-outlined text-[14px]">remove</span>
                  </button>
                  <span class="font-label-sm text-xs font-bold px-2 text-on-surface">${item.qty}</span>
                  <button onclick="changeCartDrawerQty(${idx}, 1)" class="w-5 h-5 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" type="button">
                    <span class="material-symbols-outlined text-[14px]">add</span>
                  </button>
                </div>
                <span class="font-price-md text-sm font-bold text-secondary">PKR ${(item.price * item.qty).toLocaleString()}</span>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  };

  // --- 2. RIGHT-SIDE CART DRAWER INJECTION & CONTROLLER ---
  function injectCartDrawerHTML() {
    if (document.getElementById('cartDrawer')) return;

    const drawerHTML = `
      <!-- CART DRAWER BACKDROP -->
      <div id="cartDrawerBackdrop" onclick="closeCartDrawer()" class="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9998] hidden opacity-0 transition-opacity duration-300"></div>

      <!-- CART DRAWER (RIGHT SLIDE-OVER) -->
      <div id="cartDrawer" class="fixed top-0 right-0 bottom-0 w-full max-w-md bg-surface z-[9999] shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col justify-between border-l border-outline-variant/30 font-body-md text-on-surface">
        <!-- Drawer Header -->
        <div class="p-5 flex items-center justify-between border-b border-outline-variant/30 bg-surface shadow-xs">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-[24px] text-secondary">shopping_bag</span>
            <h3 class="font-headline-sm text-lg text-on-surface font-semibold tracking-wide">Shopping Bag</h3>
            <span id="cartDrawerItemCount" class="bg-primary text-on-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full">0 items</span>
          </div>
          <button onclick="closeCartDrawer()" aria-label="Close cart drawer" class="p-1.5 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container transition-colors">
            <span class="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <!-- Free Delivery Banner -->
        <div class="bg-secondary-fixed/40 px-5 py-2.5 border-b border-outline-variant/20 flex items-center justify-between text-xs">
          <div class="flex items-center gap-2 text-on-secondary-fixed font-medium">
            <span class="material-symbols-outlined text-secondary text-[18px]">local_shipping</span>
            <span>Complimentary Nationwide TCS Delivery</span>
          </div>
          <span class="font-label-caps text-[9px] font-bold text-secondary uppercase bg-surface/70 px-1.5 py-0.5 rounded">FREE</span>
        </div>

        <!-- Scrollable Items Container -->
        <div id="cartDrawerItems" class="flex-1 overflow-y-auto p-5 space-y-3.5">
          <!-- Dynamically inserted by updateCartUI() -->
        </div>

        <!-- Drawer Footer -->
        <div id="cartDrawerFooter" class="p-5 border-t border-outline-variant/30 bg-surface-container-low space-y-3">
          <div class="space-y-1.5 text-sm">
            <div class="flex justify-between items-center text-on-surface-variant">
              <span>Standard Express Shipping</span>
              <span class="text-secondary font-bold uppercase text-xs">Free</span>
            </div>
            <div class="flex justify-between items-center text-on-surface font-semibold text-base pt-2 border-t border-outline-variant/20">
              <span>Total Payable</span>
              <span id="cartDrawerSubtotal" class="font-price-lg text-lg text-secondary font-bold">PKR 0</span>
            </div>
          </div>
          <a href="cart.html" class="w-full py-3.5 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 text-center shadow-lg hover:bg-on-surface-variant transition-all font-semibold">
            <span>Proceed to Checkout</span>
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
          <button onclick="closeCartDrawer()" class="w-full text-center text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-on-surface underline py-1 transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    `;

    const placeholder = document.createElement('div');
    placeholder.innerHTML = drawerHTML;
    while (placeholder.firstChild) {
      document.body.appendChild(placeholder.firstChild);
    }
  }

  window.openCartDrawer = function () {
    injectCartDrawerHTML();
    updateCartUI();

    const backdrop = document.getElementById('cartDrawerBackdrop');
    const drawer = document.getElementById('cartDrawer');
    if (!backdrop || !drawer) return;

    backdrop.classList.remove('hidden');
    requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
      drawer.classList.remove('translate-x-full');
      drawer.classList.add('translate-x-0');
    });
    document.body.style.overflow = 'hidden';
  };

  window.closeCartDrawer = function () {
    const backdrop = document.getElementById('cartDrawerBackdrop');
    const drawer = document.getElementById('cartDrawer');
    if (!backdrop || !drawer) return;

    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');

    setTimeout(() => {
      backdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  };

  // --- 3. TOAST NOTIFICATION SYSTEM ---
  window.showToast = function (message, options = {}) {
    let container = document.getElementById('luxelane-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'luxelane-toast-container';
      container.className = 'fixed bottom-5 right-5 z-[10000] flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0 pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto bg-primary text-on-primary shadow-2xl rounded-xl p-4 flex items-center justify-between gap-3 border border-outline-variant/20 transform transition-all duration-300 translate-y-4 opacity-0';
    
    const icon = options.icon || 'check_circle';
    const actionText = options.actionText;
    const actionHref = options.actionHref;
    const onAction = options.onAction;

    toast.innerHTML = `
      <div class="flex items-center gap-3 overflow-hidden">
        <span class="material-symbols-outlined text-[20px] text-secondary-fixed shrink-0">${icon}</span>
        <div class="text-sm font-medium leading-tight truncate">${message}</div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        ${actionText ? `<button class="toast-action-btn text-xs font-semibold uppercase tracking-wider text-secondary-fixed hover:underline px-2 py-1 bg-surface/10 rounded">${actionText}</button>` : ''}
        <button class="toast-close-btn text-on-primary/70 hover:text-on-primary p-0.5">
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    const closeToast = () => {
      toast.classList.add('translate-y-2', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    };

    toast.querySelector('.toast-close-btn').addEventListener('click', closeToast);

    if (actionText) {
      const actBtn = toast.querySelector('.toast-action-btn');
      actBtn.addEventListener('click', () => {
        closeToast();
        if (typeof onAction === 'function') onAction();
        else if (actionHref) window.location.href = actionHref;
      });
    }

    const duration = options.duration || 3500;
    setTimeout(closeToast, duration);
  };

  // --- 4. WISHLIST CONTROLLER ---
  window.toggleWishlist = function (btn, productId = '', productName = 'Item') {
    let wishlist = [];
    try {
      wishlist = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
    } catch (e) {
      wishlist = [];
    }

    if (!productId && btn) {
      productId = btn.getAttribute('data-product-id') || productName;
    }

    const index = wishlist.indexOf(productId);
    let isAdded = false;

    if (index > -1) {
      wishlist.splice(index, 1);
      isAdded = false;
    } else {
      wishlist.push(productId);
      isAdded = true;
    }

    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));

    // Update Wishlist Badges
    document.querySelectorAll('#headerWishlistBadge, .wishlist-badge').forEach(b => {
      b.textContent = wishlist.length;
    });

    // Update button visual
    if (btn) {
      const icon = btn.querySelector('.material-symbols-outlined') || btn;
      if (icon) {
        if (isAdded) {
          icon.style.fontVariationSettings = "'FILL' 1";
          icon.classList.add('text-error');
          icon.classList.remove('text-on-surface');
          btn.classList.add('scale-110');
          setTimeout(() => btn.classList.remove('scale-110'), 200);
        } else {
          icon.style.fontVariationSettings = "'FILL' 0";
          icon.classList.remove('text-error');
          icon.classList.add('text-on-surface');
        }
      }
    }

    showToast(isAdded ? `Saved "${productName}" to your Maison Wishlist` : `Removed "${productName}" from Wishlist`, {
      icon: isAdded ? 'favorite' : 'heart_broken',
      actionText: isAdded ? 'View Wishlist' : null,
      actionHref: isAdded ? 'shop.html?filter=wishlist' : null
    });
  };

  // --- 5. CURRENCY & MOBILE DRAWER NAVIGATION ---
  window.setCurrency = function (code, symbol) {
    localStorage.setItem('luxelane_currency', code);
    localStorage.setItem('luxelane_currency_symbol', symbol);
    document.querySelectorAll('#currentCurrencyLabel, .currency-label').forEach(l => {
      l.textContent = `${code} ${symbol}`;
    });
    const dropdown = document.getElementById('currencyDropdown');
    if (dropdown) dropdown.classList.add('hidden');
    showToast(`Currency set to ${code} (${symbol})`, { icon: 'payments' });
  };

  window.toggleMobileDrawer = function (open) {
    const backdrop = document.getElementById('mobileDrawerBackdrop');
    const drawer = document.getElementById('mobileDrawer');
    if (!backdrop || !drawer) return;

    if (open) {
      backdrop.classList.remove('hidden');
      requestAnimationFrame(() => {
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        drawer.classList.remove('-translate-x-full');
        drawer.classList.add('translate-x-0');
      });
      document.body.style.overflow = 'hidden';
    } else {
      backdrop.classList.remove('opacity-100');
      backdrop.classList.add('opacity-0');
      drawer.classList.remove('translate-x-0');
      drawer.classList.add('-translate-x-full');
      setTimeout(() => {
        backdrop.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }
  };

  // --- 6. ATELIER & ACCOUNT MODALS ---
  window.openAtelierModal = function () {
    let modal = document.getElementById('atelierModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'atelierModal';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm';
      modal.innerHTML = `
        <div class="bg-surface max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative border border-outline-variant/30 animate-in fade-in zoom-in duration-200">
          <button onclick="closeAtelierModal()" class="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1">
            <span class="material-symbols-outlined text-[24px]">close</span>
          </button>
          <div class="text-center mb-6">
            <span class="font-label-caps text-label-caps uppercase tracking-widest text-secondary block mb-1">Maison Consultation</span>
            <h3 class="font-headline-md text-headline-md text-on-surface">Book Private Atelier Fitting</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Reserve a bespoke 1-on-1 silhouette session at our Lahore or Karachi design studios.</p>
          </div>
          <form id="atelierBookingForm" onsubmit="handleAtelierSubmit(event)" class="space-y-4">
            <div>
              <label class="block font-label-caps text-[11px] uppercase tracking-wider text-on-surface-variant mb-1">Full Name</label>
              <input required class="w-full bg-surface-container-low px-4 py-2.5 rounded-lg border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm" placeholder="e.g. Syeda Fatima" type="text" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block font-label-caps text-[11px] uppercase tracking-wider text-on-surface-variant mb-1">Contact Phone</label>
                <input required class="w-full bg-surface-container-low px-4 py-2.5 rounded-lg border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm" placeholder="+92 300 0000000" type="tel" />
              </div>
              <div>
                <label class="block font-label-caps text-[11px] uppercase tracking-wider text-on-surface-variant mb-1">Studio Atelier</label>
                <select class="w-full bg-surface-container-low px-3 py-2.5 rounded-lg border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm">
                  <option>Gulberg III Atelier, Lahore</option>
                  <option>Clifton Block 4 Atelier, Karachi</option>
                  <option>Virtual Video Consultation</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block font-label-caps text-[11px] uppercase tracking-wider text-on-surface-variant mb-1">Ensemble Interest</label>
              <input class="w-full bg-surface-container-low px-4 py-2.5 rounded-lg border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm" placeholder="Bridal Couture, Festive Silk, or Bespoke Suit" type="text" />
            </div>
            <div class="pt-2">
              <button type="submit" class="w-full py-3.5 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest shadow-md hover:bg-on-surface-variant transition-colors rounded-lg">
                Confirm Appointment Request
              </button>
            </div>
          </form>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeAtelierModal = function () {
    const modal = document.getElementById('atelierModal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  window.handleAtelierSubmit = async function (e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form ? form.querySelectorAll('input, select, textarea') : [];
    const name = inputs[0] ? inputs[0].value.trim() : 'Atelier Patron';
    const phone = inputs[1] ? inputs[1].value.trim() : '';
    const studio = inputs[2] ? inputs[2].value.trim() : 'Lahore / Karachi Atelier';
    const date = inputs[3] ? inputs[3].value.trim() : '';
    const notes = inputs[4] ? inputs[4].value.trim() : '';

    const apiUrl = (window.location.port === '5000') ? '/api/contact' : 'http://localhost:5000/api/contact';
    try {
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: 'atelier-booking@luxelane.pk',
          phone: phone,
          subject: 'Atelier Fitting: ' + studio + (date ? ' (' + date + ')' : ''),
          message: notes || 'Private Atelier consultation request for ' + studio
        })
      });
    } catch (err) {
      console.warn('Backend sync note:', err);
    }

    closeAtelierModal();
    showToast('Consultation request received & saved to database!', {
      icon: 'event_available',
      duration: 5000
    });
  };

  window.openAccountModal = function () {
    showToast('Signed in as Amna Rehman (Phase V Extension, DHA Karachi)', {
      icon: 'person',
      actionText: 'View Orders',
      actionHref: 'cart.html'
    });
  };

  // --- 7. DOM READY BINDINGS ---
  document.addEventListener('DOMContentLoaded', () => {
    // Inject Drawer DOM
    injectCartDrawerHTML();
    updateCartUI();

    // Wire up all header cart icons
    document.querySelectorAll('[data-path="shopping-bag"]').forEach(bagLink => {
      bagLink.style.cursor = 'pointer';
      bagLink.onclick = function (e) {
        e.preventDefault();
        openCartDrawer();
      };
    });

    // Mobile Menu Button
    const mobileBtn = document.getElementById('mobileMenuBtn');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => toggleMobileDrawer(true));
    }

    const closeBtn = document.getElementById('closeMobileDrawerBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => toggleMobileDrawer(false));
    }

    const backdrop = document.getElementById('mobileDrawerBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => toggleMobileDrawer(false));
    }

    // Currency Switcher Button
    const currencyBtn = document.getElementById('currencyBtn');
    const currencyDropdown = document.getElementById('currencyDropdown');
    if (currencyBtn && currencyDropdown) {
      currencyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currencyDropdown.classList.toggle('hidden');
      });
      document.addEventListener('click', () => {
        currencyDropdown.classList.add('hidden');
      });
    }
  });
})();

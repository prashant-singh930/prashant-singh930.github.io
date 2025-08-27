// Cart logic with UI
let cart = [];

function addToCart(game, price) {
  // Check if game already in cart, increment quantity
  const found = cart.find((item) => item.game === game);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ game, price, qty: 1 });
  }
  updateCartCount();
  showCartToast(`${game} added to cart!`);
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.textContent = count;
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const imButton = document.querySelector('a[rel="im-checkout"]');
  if (!cartItems || !cartTotal) return;
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "";
    // Disable Instamojo button if cart is empty
    if (imButton) {
      imButton.style.pointerEvents = "none";
      imButton.style.opacity = "0.5";
      imButton.setAttribute("data-text", "Add items to cart");
    }
    return;
  }
  let html = "";
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price * item.qty;
    html += `<div class="cart-item">${item.game} x ${item.qty} <span>₹${(
      item.price * item.qty
    ).toFixed(
      2
    )}</span> <button class="remove-btn" onclick="removeFromCart(${idx})">Remove</button></div>`;
  });
  cartItems.innerHTML = html;
  cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
  // Enable Instamojo button and update label with total
  if (imButton) {
    imButton.style.pointerEvents = "auto";
    imButton.style.opacity = "1";
    imButton.setAttribute("data-text", `Pay ₹${total.toFixed(2)}`);
  }
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  renderCart();
  updateCartCount();
}

function clearCart() {
  cart = [];
  renderCart();
  updateCartCount();
}

function showCartModal() {
  renderCart();
  document.getElementById("cartModal").style.display = "flex";
}

function hideCartModal() {
  document.getElementById("cartModal").style.display = "none";
}

function showCartToast(msg) {
  // Simple toast using alert, can be improved
  alert(msg);
}

// Contact form handler and cart modal events
document.addEventListener("DOMContentLoaded", function () {
  // Contact form (no JS handler, handled by Formspree)
  // Cart modal events
  const cartBtn = document.getElementById("cartBtn");
  const cartModal = document.getElementById("cartModal");
  const closeCart = document.getElementById("closeCart");
  const clearCartBtn = document.getElementById("clearCartBtn");
  if (cartBtn) cartBtn.addEventListener("click", showCartModal);
  if (closeCart) closeCart.addEventListener("click", hideCartModal);
  if (cartModal)
    cartModal.addEventListener("click", function (e) {
      if (e.target === cartModal) hideCartModal();
    });
  if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);
  updateCartCount();

  // Animate fade-in sections on scroll
  const fadeSections = document.querySelectorAll(".fade-section, .fade-in");
  function handleFadeIn() {
    fadeSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        section.classList.add("visible");
      }
    });
  }
  handleFadeIn();
  window.addEventListener("scroll", handleFadeIn);
});

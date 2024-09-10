const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Retrieve the cart from session storage or initialize an empty array
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  productList.innerHTML = ""; // Clear existing product list
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners for "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) =>
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      addToCart(productId);
    })
  );
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear existing cart list
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} 
      <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Add event listeners for "Remove" buttons
  document.querySelectorAll(".remove-from-cart-btn").forEach((button) =>
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(productId);
    })
  );

  // Update session storage with the current cart state
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart without allowing duplicates
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const isProductInCart = cart.some((item) => item.id === productId);
  
  // Add product to cart only if it's not already present
  if (product && !isProductInCart) {
    cart.push(product); // Add product to cart if not already in it
  }
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId); // Remove product from cart
  renderCart();
}

// Clear cart
function clearCart() {
  cart = []; // Empty cart array
  renderCart(); // Update UI
}
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product); // Always add product to cart
  }
  renderCart();
}

// Event listener for "Clear Cart" button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();

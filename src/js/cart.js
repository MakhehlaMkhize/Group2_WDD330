import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();

renderCartContents();

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".product-list")
    .addEventListener("click", handleRemoveClick);
  document
    .querySelector(".product-list")
    .addEventListener("click", handleAddQuantityClick);
  document
    .querySelector(".product-list")
    .addEventListener("click", handleSubtractQuantityClick);
});

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  
  <div class="cart-card__quantity-container">
    <button class="cart-card__subtract-quantity" data-id="${item.Id}" title="Subtract">
      <img class="quantity-img" src="../images/minus.svg" alt="Subtract quantity button">
    </button>
    <p class="cart-card__quantity">qty: ${item.Quantity}</p>
    <button class="cart-card__add-quantity" data-id="${item.Id}" title="Add">
      <img class="quantity-img" src="../images/plus.svg" alt="Add quantity button">
    </button>
  </div>

  <button class="cart-card__remove" data-id="${item.Id}">
    <img src="../images/x.svg" alt="Remove item icon" Title="Remove"> 
  </button>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems !== null) {
    if (Array.isArray(cartItems)) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(".product-list").innerHTML = htmlItems.join("");
      displayCartTotal();
    } else {
      // console.warn("cartItems is not an array:", cartItems);
      setLocalStorage("so-cart", []); // Resetting 'so-cart' to an empty array
    }
  }
}

function displayCartTotal() {
  updateCartTotalVisibility();
  const cartItems = getLocalStorage("so-cart");
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.FinalPrice * item.Quantity,
    0
  );
  document.querySelector(".cart-total").textContent = `$${cartTotal}`;
}

function handleRemoveClick(event) {
  if (event.target.closest(".cart-card__remove")) {
    const itemId = event.target.closest(".cart-card__remove").dataset.id;
    removeItemFromCart(itemId);
    renderCartContents();
  }
}

function handleAddQuantityClick(event) {
  if (event.target.closest(".cart-card__add-quantity")) {
    const itemId = event.target.closest(".cart-card__add-quantity").dataset.id;
    addQuantity(itemId);
    renderCartContents();
  }
}

function handleSubtractQuantityClick(event) {
  if (event.target.closest(".cart-card__subtract-quantity")) {
    const itemId = event.target.closest(".cart-card__subtract-quantity").dataset
      .id;
    subtractQuantity(itemId);
    renderCartContents();
  }
}

function addQuantity(itemId) {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems && Array.isArray(cartItems)) {
    const item = cartItems.find((item) => item.Id === itemId);
    if (item) {
      item.Quantity++;
      setLocalStorage("so-cart", cartItems);
    }
  }
}

function subtractQuantity(itemId) {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems && Array.isArray(cartItems)) {
    const item = cartItems.find((item) => item.Id === itemId);
    if (item && item.Quantity > 1) {
      item.Quantity--;
      setLocalStorage("so-cart", cartItems);
    } else {
      removeItemFromCart(itemId);
    }
  }
}

function removeItemFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems && Array.isArray(cartItems)) {
    cartItems = cartItems.filter((item) => item.Id !== itemId);
    setLocalStorage("so-cart", cartItems);
    updateCartTotalVisibility();
  }
}

function updateCartTotalVisibility() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
    document.querySelector(".cart-footer").classList.remove("hide");
  } else {
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

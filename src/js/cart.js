import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  
  if (cartItems !== null) {
    if (Array.isArray(cartItems)) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(".product-list").innerHTML = htmlItems.join("");
    } else {
      console.warn("cartItems is not an array:", cartItems);
      setLocalStorage("so-cart", []);  // Resetting 'so-cart' to an empty array
    }
  }
}

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
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
  <button class="cart-card__remove" data-id="${item.Id}">
    <img src="../images/x.svg" alt="Remove item icon" Title="Remove"> 
  </button>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector(".product-list").addEventListener("click", handleRemoveClick);
});

function handleRemoveClick(event) {
  if (event.target.closest('.cart-card__remove')) { // Ensure that the clicked element or its parent has the class 'cart-card__remove'
    const itemId = event.target.closest('.cart-card__remove').dataset.id;
    removeItemFromCart(itemId);
    renderCartContents();
  }
}
 
function removeItemFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems && Array.isArray(cartItems)) {
    cartItems = cartItems.filter(item => item.Id !== itemId);
    setLocalStorage("so-cart", cartItems);
  }
}


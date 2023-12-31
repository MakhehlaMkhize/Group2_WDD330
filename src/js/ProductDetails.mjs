import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Image}"
        alt="${product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
      ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
  }

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }
    
      async init() {
        // get product details
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");

        // add to cart button event handler
        document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
      }
      addToCart() {
        let cartItems = getLocalStorage("so-cart") || [];
        if (Array.isArray(cartItems)) {
          
          // check for existing item
          const existingItem = cartItems.find(
            (item) => item.Id === this.product.Id
          );
          if (existingItem) {
            existingItem.Quantity++;
          } else {
            this.product.Quantity = 1;
            cartItems.push(this.product);
          }

          // save to local storage
          setLocalStorage("so-cart", cartItems);
        } else {
          console.warn("Cart items retrieved from local storage is not an array:", cartItems);
        }
    }    
      renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
          "afterBegin",
          productDetailsTemplate(this.product)
        );
      }
    }
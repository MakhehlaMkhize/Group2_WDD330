import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

listing.init();

const joinbtn = document.querySelector("#join-news-btn");
const modal = document.querySelector("#modal");
let span = document.querySelector(".close");
const closesumbission = document.querySelector(".close-submission");
let thanks = document.querySelector(".thanks");
const submitbtn = document.querySelector(".submitBtn");
let closeSubmissionBtn = document.querySelector(".close-submission");

joinbtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

closesumbission.onclick = function () {
  thanks.style.display = "none";
};
closesumbission.onclick = function () {
  thanks.style.display = "none";
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == thanks) {
    thanks.style.display = "none";
  }
};
//Check and report form validity
document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status)
    myCheckout.checkout();
  });

submitbtn.onclick = function (event) {
  event.preventDefault();
  let content = document.querySelector("#modal-content");
  content.remove();
  thanks.style.display = "block";
};



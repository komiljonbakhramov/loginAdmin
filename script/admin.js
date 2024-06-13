import { checkToken, redirect } from "./utils.js";

const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");

window.addEventListener("DOMContentLoaded", function () {
  const hasToken = checkToken();

  if (!hasToken) {
    redirect("/index.html");
  }
});

const products = [];

document.getElementById('product-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const titleValue = title.value;
  const priceValue = price.value;
  const descriptionValue = description.value;

  if (titleValue && priceValue && descriptionValue) {
    const product = {
      id: Date.now(),
      title: titleValue,
      price: parseFloat(priceValue),
      description: descriptionValue
    };

    products.push(product);
    updateProductsList();

    title.value = '';
    price.value = '';
    description.value = '';
  } else {
    alert("mahsulot to'lmadi");
  }
});

function updateProductsList() {
  const productsList = document.getElementById('productsList');
  productsList.innerHTML = '';

  products.forEach((product, index) => {
    const li = document.createElement('li');
    li.className = "product_item";

    const titleP = document.createElement('p');
    titleP.className = 'product_info';
    titleP.textContent = `Title: ${product.title}`;
    li.appendChild(titleP);

    const priceP = document.createElement('p');
    priceP.className = 'product_info';
    priceP.textContent = `Price: ${product.price}`;
    li.appendChild(priceP);

    const descriptionP = document.createElement('p');
    descriptionP.className = 'product_info';
    descriptionP.textContent = `Description: ${product.description}`;
    li.appendChild(descriptionP);

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-btn';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function () {
      removeProduct(index);
    });
    li.appendChild(removeButton);


    productsList.appendChild(li);
  });

  console.log(products);
}

function removeProduct(index) {
  products.splice(index, 1);
  updateProductsList();
}

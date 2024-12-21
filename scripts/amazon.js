let productsHTML = '';

// Assuming `products` is an array of product objects.
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

// Ren.der products to the page
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    //const productId = button.dataset.productId; // Get product ID from the data attribute.
      const {productId}=button.dataset;
     /*<button data-product-id="123" data-product-category="electronics" class="btn"></button>

    const { productId, productCategory } = button.dataset;
    console.log(productId); // Output: "123"
    console.log(productCategory); // Output: "electronics"
    */
    let matchingItem;
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1
      });
    }
    function displayAddMessage(){
      let add;
    let addMessage= document.querySelector(`.js-added-to-cart-${productId}`);
    addMessage.classList.add('added-to-cart-visible');
    if(add){
      add.clearTimeout();
    }
    let addMessageRemove= setTimeout(()=>{
      addMessage.classList.remove('added-to-cart-visible');}
    ,2000);
    add=addMessageRemove;
    };
    displayAddMessage();

    // Get the selected quantity
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    let productQuantity=Number(quantitySelector.value);
    console.log(productQuantity);
    console.log(typeof productQuantity);

    // Update total cart quantity
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  });
});

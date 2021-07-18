window.onload = function() {
  document.addEventListener("click", documentActions);

  // Actions (делегирование события click)
  function documentActions(e) {
    const targetElement = e.target;
    if (targetElement.classList.contains('menu__btn')) {
      getProducts(targetElement);
      e.preventDefault();
    }
    if (targetElement.classList.contains('menu__item-btn')) {
      const productId = targetElement.closest('.menu__item').dataset.pid;
      addToCart(targetElement, productId);
      e.preventDefault();
    }

    if (targetElement.classList.contains('cart-header') || targetElement.closest('.cart-header__icon')) {
      if (document.querySelector('.cart-list').children.length > 0) {
        document.querySelector('.cart-header').classList.toggle('_active');
      }
      e.preventDefault();
    } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('menu__item-btn')) {
      document.querySelector('.cart-header').classList.remove('_active');
    }

    if (targetElement.classList.contains('cart-list__delete')) {
      const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
      updateCart(targetElement, productId, false);
      e.preventDefault();
    }
  }

  // Learn More btn
  async function getProducts(button) {
    if (!button.classList.contains("_hold")) {
      button.classList.add('_hold');
      const file = "assets/json/product.json";
      let response = await fetch(file, {
        method: "GET"
      });
      if (response.ok) {
        let result = await response.json();
        loadProducts(result);
        button.classList.remove("_hold");
        button.remove();
      }else{
        alert("Error");
      }
    }
  }

  function loadProducts(data) {
    const productItems = document.querySelector('.menu__inner');
  
    data.product.forEach(item => {
      const productId = item.id;
      const productUrl = item.url;
      const productImage = item.image;
      const productTitle = item.title;
      const productText = item.text;
      const productPrice = item.price;
  
      let template = `
                    <article data-pid="${productId}" class="menu__item">
                      <a href="" class="item-product__image">
                      <img src="${productImage}" alt="name">
                      </a>
                      <div class="menu__item-conten">
                        <div class="menu__item-title">
                            <a class="item-product__title" href="#">${productTitle}</a>
                            <div class="price">${productPrice}</div>
                        </div>
                        <p class="menu__item-des">${productText}</p>
                        <div class="menu__item-rating">
                            <button class="menu__item-btn">+</button>
                            <div class="rating">
                              <ul>
                                  <li><i class="fas fa-star"></i></li>
                                  <li><i class="fas fa-star"></i></li>
                                  <li><i class="fas fa-star"></i></li>
                                  <li><i class="fas fa-star"></i></li>
                                  <li class="active"><i class="fas fa-star"></i></li>
                              </ul>
                            </div>
                        </div>
                      </div>
                    </article>
      `;
      productItems.insertAdjacentHTML('beforeend', template);
    });
  
  }
  
  // addtoCart
  function addToCart(productButton, productId) {
    if (!productButton.classList.contains('_hold')) {
      productButton.classList.add('_hold');
      productButton.classList.add('_fly');
  
      const cart = document.querySelector('.cart-header__icon');
      const product = document.querySelector(`[data-pid="${productId}"]`);
      const productImage = product.querySelector('.item-product__image img');
  
      const productImageFly = productImage.cloneNode(true);
  
      const productImageFlyWidth = productImage.offsetWidth;
      const productImageFlyHeight = productImage.offsetHeight;
      const productImageFlyTop = productImage.getBoundingClientRect().top;
      const productImageFlyLeft = productImage.getBoundingClientRect().left;
  
      productImageFly.setAttribute('class', '_flyImage _ibg');
      productImageFly.style.cssText = 
      `
        left: ${productImageFlyLeft}px;
        top: ${productImageFlyTop}px;
        width: ${productImageFlyWidth}px;
        height: ${productImageFlyHeight}px;
      `;
  
      document.body.append(productImageFly);

      const cartFlyLeft = cart.getBoundingClientRect().left;
      const cartFlyTop = cart.getBoundingClientRect().top;

      productImageFly.style.cssText = 
      `
        left: ${cartFlyLeft}px;
        top: ${cartFlyTop}px;
        width: 0px;
        height: 0px;
        opacity: 0;
      `;

      productImageFly.addEventListener('transitionend', function() {
        if(productButton.classList.contains('_fly')){
          productImageFly.remove();
          updateCart(productButton, productId);
          productButton.classList.remove('_fly');
        }
      });


    }
  }

  function updateCart(productButton, productId, productAdd = true) {
    const cart = document.querySelector('.cart-header');
    const cartIcon = cart.querySelector('.cart-header__icon');
    const cartQuantity = cartIcon.querySelector('span');
    const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
    const cartList = document.querySelector('.cart-list');

    // Добавляем
    if (productAdd) {
      if (cartQuantity) {
        cartQuantity.innerHTML = ++cartQuantity.innerHTML;
      } else {
        cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
      }
      if (!cartProduct) {
        const product = document.querySelector(`[data-pid="${productId}"]`);
        const cartProductImage = product.querySelector('.item-product__image').innerHTML;
        const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
        const cartProductContent = `
          <a href="" class="cart-list__image _ibg">${cartProductImage}</a>
          <div class="cart-list__body">
            <a href="" class="cart-list__title">${cartProductTitle}</a>
            <div class="cart-list__quantity">Quantity: <span>1</span></div>
            <a href="" onclick="return false;" class="cart-list__delete">Delete</a>
          </div>`;
        cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`);
      } else {
        const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
        cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
      }

      // После всех действий
      productButton.classList.remove('_hold');
    } else {
      const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
      cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
      if (!parseInt(cartProductQuantity.innerHTML)) {
        cartProduct.remove();
      }

      const cartQuantityValue = --cartQuantity.innerHTML;

      if (cartQuantityValue) {
        cartQuantity.innerHTML = cartQuantityValue;
      } else {
        cartQuantity.remove();
        cart.classList.remove('_active');
      }
    }
  }

  $(document).ready(function() {
    $('.header__burger').click(function(event) {
      $('.header__burger').toggleClass('active')
      $('.header__nav ul').toggleClass('active')
     });
  });

}




// slider
const swiper = new Swiper('.swiper-container', {
   loop: true,
 
   navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
   },
 });


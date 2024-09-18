$("#socialShare").socialSharingPlugin({
  url: window.location.href,
  title: $('meta[property="og:title"]').attr("content"),
  description: $('meta[property="og:description"]').attr("content"),
  img: $('meta[property="og:image"]').attr("content"),
  responsive: true,
  enable: ["facebook", "whatsapp", "instagram", "twitter"],
});

$(document).ready(function () {
    // Function to start counter animation
    function startCounterAnimation(counterElement) {
        $(counterElement).prop('Counter', 0).animate({
            Counter: $(counterElement).text()
        }, {
            duration: 2500,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    }

    // Intersection Observer to check if the counter is in the viewport
    let observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Start counter animation when it enters the viewport
                startCounterAnimation(entry.target);
                // Unobserve the element after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold as needed

    // Observe each counter element
    $('.counter').each(function () {
        observer.observe(this);
    });
});

$(document).ready(function () {
  var sync1 = $("#prod-gal-sync1");
  var sync2 = $("#prod-gal-sync2");
  var slidesPerPage = 4; //globaly define number of elements per page
  var syncedSecondary = true;

  sync1
    .owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: false,
      autoplay: false,
      dots: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      loop: true,
      responsiveRefreshRate: 400,
    })
    .on("changed.owl.carousel", syncPosition);

  sync2
    .on("initialized.owl.carousel", function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
      items: slidesPerPage,
      dots: false,
      nav: false,
      smartSpeed: 200,
      slideSpeed: 500,
      slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
      responsiveRefreshRate: 100,
    })
    .on("changed.owl.carousel", syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;

    //if you disable loop you have to comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }

    //end block

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find(".owl-item.active").length - 1;
    var start = sync2.find(".owl-item.active").first().index();
    var end = sync2.find(".owl-item.active").last().index();

    if (current > end) {
      sync2.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
      sync2.data("owl.carousel").to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      sync1.data("owl.carousel").to(number, 100, true);
    }
  }

  sync2.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data("owl.carousel").to(number, 300, true);
  });
});

$(".testim-slide").marquee({
  direction: "left",
  duration: 45000,
  gap: 30,
  delayBeforeStart: 0,
  duplicated: true,
  startVisible: true,
});

if ($(".search-toggler").length) {
  $(".search-toggler").on("click", function (e) {
    e.preventDefault();
    $(".search-popup").toggleClass("active");
    $(".mobile-nav__wrapper").removeClass("expanded");
    $("body").toggleClass("locked");
  });
}

var slider = document.getElementById("priceRange");
var output = document.getElementById("range-val");
if (output) {
  output.innerHTML = slider.value;

  slider.oninput = function () {
    output.innerHTML = this.value;
  };
}

window.addEventListener("scroll", function () {
  const header = document.getElementById("header"),
    scroll = window.pageYOffset | document.body.scrollTop;

  if (scroll > 100) {
    header.className = "header scrolled";
  } else if (scroll <= 100) {
    header.className = "header";
  }
});


const currentLocation = window.location.pathname; // Get current page path
const menuItems = document.querySelectorAll('.navbar-nav .nav-item a'); // Get all menu links

menuItems.forEach(item => {
    // Check if the link's href matches the current path
    if (item.getAttribute('href') === currentLocation.split("/").pop()) {
        item.classList.add('active'); // Add the active class
    }
});

// Retrieve cart from local storage
function loadCart() {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
}

// Save cart to local storage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// Initialize cart array from local storage
var cart = loadCart();

// // Initialize cart array
// let cart = [];

// Function to update the cart display
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartTotalArea = document.getElementById("cart-total-area");
  const cartCount = document.getElementById("cart-count");
  const cartModal = document.getElementById("cart-modal");
  

  // Clear existing items
  if (cartItemsContainer){
    cartItemsContainer.innerHTML = "";
  }
 

  // Check if cart is empty
  // if (cart.length === 0) {
  // // Display a message or design for an empty cart
  // cartItemsContainer.innerHTML = `
  //     <div class="empty-cart text-center">
  //       <img src="assets/images/cart-empty.png" alt="" class="mb-4" width="110">
  //         <h3>Your cart is empty!</h3>
  //         <p>It looks like you haven't added any items to your cart yet.</p>
  //     </div>
  // `;

  //   }

  // Calculate total
  let total = 0;

  // Add each item in the cart to the display
  cart.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.className = "cart-item";
    listItem.innerHTML = `

        <div class="cart-item py-3 border-bottom">
                          <div class="row">
                            <div class="col-6 col-md-5 col-xl-4">
                            <img class="img-fluid" src="${item.image}" alt="${
      item.name
    }">
                          </div>
                          <div class="col-6 col-md-7 col-xl-8 align-self-center">
                            <div class="mx-0">
                              <h5 class="mb-2">${item.name}</h5>
                              <small class="text-white bg-thm px-2 d-inline-block rounded-3 mb-2">In Stock</small>
                              <h6 class="mb-3"><strike>$6.77</strike>&nbsp; $${item.price.toFixed(
                                2
                              )}</h6>
                              <div class="d-flex align-items-center justify-content-between">
                              <div>
                              <div class="quantity-controls d-flex align-items-center">
                                  <button class="quantity-decrease" data-id="${
                                    item.id
                                  }">-</button>
                                  <input type="number" value="${
                                    item.quantity
                                  }" min="1" class="quantity-input form-control" data-id="${
      item.id
    }">
                                  <button class="quantity-increase" data-id="${
                                    item.id
                                  }">+</button>
                              </div>
                              </div>
                              <button class="remove-from-cart" data-id="${
                                item.id
                              }">Remove</button>
                              </div>
                            </div>
                          </div>
                          </div>
                          
                        </div>

                              `;
    cartItemsContainer.appendChild(listItem);

    total += item.price * item.quantity;
  });

  // Update total
  cartTotal.textContent = total.toFixed(2);

  // Update cart item count
  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  // Add or remove 'active' class based on cart content
  if (cart.length > 0) {
    // cartModal.classList.add("isActive");
    cartTotalArea.classList.remove("d-none");
  } else {
    cartTotalArea.classList.add("d-none");
    cartItemsContainer.innerHTML = `
            <div class="empty-cart text-center">
              <img src="assets/images/cart-empty.png" alt="" class="mb-4" width="110">
                <h3>Your cart is empty!</h3>
                <p>It looks like you haven't added any items to your cart yet.</p>
            </div>
        `;
  }
}

// Function to handle add-to-cart clicks
function addToCart(event) {
  const productElement = event.target.closest(".product-item");
  const id = productElement.dataset.id;
  const name = productElement.dataset.name;
  const price = parseFloat(productElement.dataset.price);
  const image = productElement.dataset.image;

  console.log(id);
  // Check if item is already in cart
  const existingItemIndex = cart.findIndex((item) => {
    return item.id === id;
    // console.log(id, item.id)
    return false;
  });
  let currentValue =
    Number(document.getElementById("prod-qty-chng")?.value) || 1;

  if (existingItemIndex === -1) {
    // Add item to cart
    cart.push({ id, name, price, image, quantity: currentValue });
  } else {
    // Item already in cart; optionally, handle quantity update here
    cart[existingItemIndex].quantity += 1;
  }
  saveCart();
  updateCart();
}

// Function to handle remove-from-cart clicks
function removeFromCart(event) {
  const id = event.target.dataset.id;

  // Remove item from cart
  cart = cart.filter((item) => item.id !== id);

  // Save to local storage
  saveCart();
  updateCart();
}

// Function to handle quantity changes

function changeQuantity(id, change) {
  const itemIndex = cart.findIndex((item) => item.id === id);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change;
    if (document.getElementById("prod-qty-chng")) {
      document.getElementById("prod-qty-chng").value = cart[itemIndex].quantity;
    }

    if (cart[itemIndex].quantity <= 0) {
      // Remove item from cart if quantity is 0 or less
      cart.splice(itemIndex, 1);
    }
    // Save to local storage
    saveCart();
    updateCart();
  } else {
    let currentValue =
      Number(document.getElementById("prod-qty-chng").value) || 1;
    currentValue += change;
    // console.log(currentValue, change)
    if (currentValue > 0) {
      document.getElementById("prod-qty-chng").value = currentValue;
    }
  }
}

// function changeQuantity(id, change) {
//     const itemIndex = cart.findIndex(item => item.id === id);
//     var quantity = 1
//     if (itemIndex !== -1) {
//         quantity += change;
//         cart[itemIndex].quantity = quantity
//         if (cart[itemIndex].quantity <= 0) {
//             // Remove item from cart if quantity is 0 or less
//             cart.splice(itemIndex, 1);
//         }
//         // Save to local storage
//         saveCart();
//         updateCart();
//       //  / document.getElementById("prod-qty-chng").value = quantity
//         console.log (quantity)
//     }
// }

// Function to handle quantity button clicks
function handleQuantityChange(event) {
  console.log("handleQuantityChange");
  const button = event.target;
  const id = button.dataset.id;
  console.log(button.classList, button.classList.contains("quantity-increase"));
  if (button.classList.contains("quantity-increase")) {
    changeQuantity(id, 1);
  } else if (button.classList.contains("quantity-decrease")) {
    changeQuantity(id, -1);
  }
}

// Function to handle input field changes
function handleQuantityInput(event) {
  const input = event.target;
  const id = input.dataset.id;
  const newQuantity = parseInt(input.value, 10);

  if (newQuantity > 0) {
    const itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      cart[itemIndex].quantity = newQuantity;
      if (newQuantity === 0) {
        // Remove item from cart if quantity is 0
        cart.splice(itemIndex, 1);
      }
      // Save to local storage
      saveCart();
      updateCart();
    }
  }
}

// Set up event listeners
document
  .getElementById("product-list")
  ?.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart")) {
      addToCart(event);
    }
  });

document
  .getElementById("cart-items")
  ?.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart")) {
      removeFromCart(event);
    } else if (
      event.target.classList.contains("quantity-increase") ||
      event.target.classList.contains("quantity-decrease")
    ) {
      handleQuantityChange(event);
    }
  });

document
  .getElementById("prod-dtl-container")
  ?.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("quantity-increase") ||
      event.target.classList.contains("quantity-decrease")
    ) {
      handleQuantityChange(event);
    }
  });

document
  .getElementById("cart-items")
  ?.addEventListener("input", function (event) {
    if (event.target.classList.contains("quantity-input")) {
      handleQuantityInput(event);
    }
  });

// Initial cart update
updateCart();

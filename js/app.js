document.getElementById("menu-btn").onclick = () =>
  document.getElementById("mobile-menu").classList.toggle("hidden");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart(cart.length);

function updateCart(n) {
  document.querySelector("#cart-count").textContent = n;
}

lucide.createIcons();


async function loadProducts() {
  const res = await fetch("https://fakestoreapi.com/products?limit=8");
  const products = await res.json();

  const container = document.getElementById("products-container");
  container.innerHTML = products.map(product => {
    const inCart = cart.includes(product.id);
    return `
      <div class="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden group relative">
        <!-- Product image + title links to detail -->
        <a href="product.html?id=${product.id}" class="block">
          <div class="w-full h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
            <img src="${product.image}" alt="${product.title}"
              class="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-105"/>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800 line-clamp-2">${product.title}</h3>
            <span class="text-xl font-bold text-black">$${product.price}</span>
          </div>
        </a>
        <!-- Add/Remove Cart -->
        <div class="p-4 pt-0">
          <button onclick="toggleCart(${product.id}, this)"
            class="w-full ${inCart ? 'bg-red-500 hover:bg-red-600' : 'bg-black hover:bg-black/80'} text-white text-xs py-2 px-4 rounded-xl shadow-md transition-all flex items-center justify-center"
            data-id="${product.id}">
            <i data-lucide="shopping-cart" class="mr-2"></i> ${inCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}


function toggleCart(id, btn) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.includes(id)) {
    cart = cart.filter(item => item !== id);
    btn.classList.remove("bg-red-500", "hover:bg-red-600");
    btn.classList.add("bg-black", "hover:bg-black/80");
    btn.innerHTML = `<i data-lucide="shopping-cart" class="mr-2"></i> Add to Cart`;
  } else {

    cart.push(id);
    btn.classList.remove("bg-black", "hover:bg-black/80");
    btn.classList.add("bg-red-500", "hover:bg-red-600");
    btn.innerHTML = `<i data-lucide="shopping-cart" class="mr-2"></i> Remove from Cart`;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart(cart.length);
  lucide.createIcons();
}

loadProducts();



async function loadCategory() {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const categories = await res.json();

      const container = document.getElementById("category-container");
      container.innerHTML = categories.map(cat => `
        <a href="category.html?category=${encodeURIComponent(cat)}" 
           class="p-6 bg-white shadow rounded-xl text-center hover:shadow-lg transition">
          <h2 class="font-semibold capitalize">${cat}</h2>
        </a>
      `).join("");
    }
    loadCategory();
  
    
    function saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    }
    function updateCartCount() {
      const cart = getCart();
      const count = cart.reduce((sum, item) => sum + item.qty, 0);
      document.getElementById("cart-count").textContent = count;
    }
document.addEventListener("DOMContentLoaded", updateCartCount);
    



// cart

async function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    document.getElementById("cart-container").innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const requests = cart.map(id =>
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Product ${id} not found`);
        return res.json();
      })
      .catch(err => {
        console.warn(err.message);
        return null;
      })
  );

  let products = await Promise.all(requests);


  products = products.filter(p => p !== null);

  if (products.length === 0) {
    document.getElementById("cart-container").innerHTML = "<p>Your cart is empty.</p>";
    localStorage.removeItem("cart"); 
    return;
  }

  let total = 0;
  document.getElementById("cart-container").innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Your Cart</h2>
    <div class="space-y-4">
      ${products.map(p => {
        total += p.price;
        return `
          <div class="flex items-center gap-4 bg-white shadow p-4 rounded-xl">
            <img src="${p.image}" class="w-20 h-20 object-contain"/>
            <div>
              <h3 class="font-semibold">${p.title}</h3>
              <span class="text-black">$${p.price}</span>
            </div>
          </div>
        `;
      }).join("")}
    </div>
    <div class="mt-6 text-right">
      <p class="text-xl font-bold">Total: $${total.toFixed(2)}</p>
      <button onclick="checkout()" class="mt-4 bg-black text-white py-3 px-6 rounded-xl hover:bg-black/80">
        Checkout
      </button>
    </div>
  `;
}

function checkout() {
  alert("Checkout successful! (Demo)");
  localStorage.removeItem("cart");
  window.location.href = "shop.html";
}

loadCart();

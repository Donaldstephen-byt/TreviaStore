const params = new URLSearchParams(window.location.search);
      const category = params.get("category");


      document.getElementById("category-title").textContent = category;

      async function loadProducts() {
        try {
          const res = await fetch(
            `https://fakestoreapi.com/products/category/${encodeURIComponent(
              category
            )}`
          );
          const products = await res.json();

          const container = document.getElementById("product-container");
          container.innerHTML = products
            .map((p) => {
              const inCart = cart.includes(p.id); 
              return `
        <div class="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden group relative">
          <a href="product.html?id=${p.id}" class="block">
            <div class="w-full h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src="${p.image}" alt="${p.title}"
                class="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-105"/>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800 line-clamp-2">${
                p.title
              }</h3>
              <span class="text-xl font-bold text-black">$${p.price}</span>
            </div>
          </a>
          <div class="p-4 pt-0">
            <button onclick="toggleCart(${p.id}, this)"
              class="w-full ${
                inCart
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-black hover:bg-black/80"
              } text-white text-xs py-2 px-4 rounded-xl shadow-md transition-all flex items-center justify-center"
              data-id="${p.id}">
              <i data-lucide="shopping-cart" class="mr-2"></i> ${
                inCart ? "Remove from Cart" : "Add to Cart"
              }
            </button>
          </div>
        </div>
        `;
            })
            .join("");
        } catch (err) {
          console.error("Error fetching products:", err);
        }
      }

      loadProducts();

       lucide.createIcons();
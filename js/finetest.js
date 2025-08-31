// async function loadCart() {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   if (cart.length === 0) {
//     document.getElementById("cart-container").innerHTML = "<p>Your cart is empty.</p>";
//     return;
//   }

//   const requests = cart.map(id =>
//     fetch(`https://fakestoreapi.com/products/${id}`)
//       .then(res => {
//         if (!res.ok) throw new Error(`Product ${id} not found`);
//         return res.json();
//       })
//       .catch(err => {
//         console.warn(err.message);
//         return null;
//       })
//   );

//   let products = await Promise.all(requests);


//   products = products.filter(p => p !== null);

//   if (products.length === 0) {
//     document.getElementById("cart-container").innerHTML = "<p>Your cart is empty.</p>";
//     localStorage.removeItem("cart"); 
//     return;
//   }

//   let total = 0;
//   document.getElementById("cart-container").innerHTML = `
//     <h2 class="text-2xl font-bold mb-4">Your Cart</h2>
//     <div class="space-y-4">
//       ${products.map(p => {
//         total += p.price;
//         return `
//           <div class="flex items-center gap-4 bg-white shadow p-4 rounded-xl">
//             <img src="${p.image}" class="w-20 h-20 object-contain"/>
//             <div>
//               <h3 class="font-semibold">${p.title}</h3>
//               <span class="text-black">$${p.price}</span>
//             </div>
//           </div>
//         `;
//       }).join("")}
//     </div>
//     <div class="mt-6 text-right">
//       <p class="text-xl font-bold">Total: $${total.toFixed(2)}</p>
//       <button onclick="checkout()" class="mt-4 bg-black text-white py-3 px-6 rounded-xl hover:bg-black/80">
//         Checkout
//       </button>
//     </div>
//   `;
// }

// function checkout() {
//   alert("Checkout successful! (Demo)");
//   localStorage.removeItem("cart");
//   window.location.href = "shop.html";
// }

// loadCart();

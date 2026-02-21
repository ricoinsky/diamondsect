let cart = [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCartUI();
  alert(product.name + " foi adicionado ao carrinho.");
}

function updateCartUI() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  container.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    container.innerHTML += `
      <div class="product">
        <h3>${item.name}</h3>
        <p>R$ ${item.price.toFixed(2)}</p>
        <button onclick="removeFromCart(${index})">Remover</button>
      </div>
    `;
  });

  container.innerHTML += `
    <hr style="margin:30px 0; border-color:#333;">
    <h3>Total: R$ ${total.toFixed(2)}</h3>
  `;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function checkout() {
  alert("Pagamento será ativado quando integrar Stripe.");
}

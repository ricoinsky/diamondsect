// =============================
// CATÁLOGO (VAZIO POR ENQUANTO)
// =============================
const PRODUCTS = [];

// mantém compatibilidade com o carrinho
window.PRODUCTS = PRODUCTS;


// =============================
// CARRINHO (LOCAL STORAGE)
// =============================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id) {
  alert("Em breve você poderá comprar este produto.");
}


// =============================
// CONTADOR DO CARRINHO
// =============================
function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);

  document.querySelectorAll(".cartcount").forEach(el => {
    el.textContent = total;
  });
}


// =============================
// EMPTY STATE PREMIUM
// =============================
function renderEmpty(container){
  container.innerHTML = `
    <div class="empty-premium">
      <div class="empty-box">
        <h2>Coleção em preparação</h2>
        <p>Estamos selecionando peças exclusivas para você.<br/>Em breve novidades premium disponíveis.</p>
        <a href="index.html" class="btn">Voltar ao início</a>
      </div>
    </div>
  `;
}


// =============================
// RENDER PRODUTOS
// =============================
function renderProducts() {
  const container = document.getElementById("shopGrid");
  if (!container) return;

  if(PRODUCTS.length === 0){
    renderEmpty(container);
    return;
  }

  const category = document.body.dataset.category;

  let filtered = PRODUCTS;
  if (category) {
    filtered = PRODUCTS.filter(p => p.category === category);
  }

  container.innerHTML = filtered.map(p => `
    <div class="product">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>R$ ${p.price.toFixed(2)}</p>
      <button onclick="addToCart(${p.id})">Comprar</button>
    </div>
  `).join("");
}


// =============================
// INIT
// =============================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProducts();
});

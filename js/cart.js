const LS_CART_KEY = "diamondsect_cart_v1";

function moneyBRL(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(LS_CART_KEY)) || [];
  } catch {
    return [];
  }
}
function writeCart(cart) {
  localStorage.setItem(LS_CART_KEY, JSON.stringify(cart));
}

function setCartCountUI() {
  const cart = readCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".cartcount").forEach((el) => (el.textContent = String(count)));
}

// O catálogo vem do shop.js (PRODUCTS)
function getProductById(id) {
  return (window.PRODUCTS || []).find((p) => p.id === id);
}

function updateQty(id, delta) {
  const cart = readCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    const idx = cart.findIndex((i) => i.id === id);
    cart.splice(idx, 1);
  }
  writeCart(cart);
  renderCart();
}

function removeItem(id) {
  const cart = readCart().filter((i) => i.id !== id);
  writeCart(cart);
  renderCart();
}

function renderCart() {
  setCartCountUI();

  const wrap = document.getElementById("cartWrap");
  const totalEl = document.getElementById("cartTotal");
  if (!wrap || !totalEl) return;

  const cart = readCart();

  if (cart.length === 0) {
    wrap.innerHTML = `
      <div class="cart-empty">
        <h2>Seu carrinho está vazio</h2>
        <p>Escolha uma categoria e adicione itens premium à sua seleção.</p>
        <a class="btn" href="index.html">Voltar para a loja</a>
      </div>
    `;
    totalEl.textContent = moneyBRL(0);
    return;
  }

  let total = 0;

  const rows = cart
    .map((i) => {
      const p = getProductById(i.id);
      if (!p) return "";

      const line = p.price * i.qty;
      total += line;

      return `
        <div class="cart-row">
          <img class="cart-img" src="${p.image}" alt="${p.name}" />
          <div class="cart-info">
            <div class="cart-name">${p.name}</div>
            <div class="cart-price">${moneyBRL(p.price)}</div>

            <div class="cart-actions">
              <button class="qbtn" type="button" data-minus="${p.id}">−</button>
              <span class="qty">${i.qty}</span>
              <button class="qbtn" type="button" data-plus="${p.id}">+</button>

              <button class="rmbtn" type="button" data-rm="${p.id}">Remover</button>
            </div>
          </div>
          <div class="cart-line">${moneyBRL(line)}</div>
        </div>
      `;
    })
    .join("");

  wrap.innerHTML = rows;
  totalEl.textContent = moneyBRL(total);

  wrap.querySelectorAll("[data-plus]").forEach((b) => {
    b.addEventListener("click", () => updateQty(b.getAttribute("data-plus"), +1));
  });
  wrap.querySelectorAll("[data-minus]").forEach((b) => {
    b.addEventListener("click", () => updateQty(b.getAttribute("data-minus"), -1));
  });
  wrap.querySelectorAll("[data-rm]").forEach((b) => {
    b.addEventListener("click", () => removeItem(b.getAttribute("data-rm")));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

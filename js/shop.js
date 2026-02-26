// =============================
// DIAMONDSECT — SHOP (premium)
// =============================
const PRODUCTS = []; // ✅ VAZIO: você vai cadastrar depois
window.PRODUCTS = PRODUCTS;

function moneyBRL(v){
  return Number(v || 0).toLocaleString("pt-BR", { style:"currency", currency:"BRL" });
}

function getCart(){ return JSON.parse(localStorage.getItem("cart")) || []; }
function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount(){
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + (Number(item.qty)||0), 0);
  document.querySelectorAll(".cartcount").forEach(el => el.textContent = total);
}

function addToCart(id){
  const cart = getCart();
  const item = cart.find(p => Number(p.id) === Number(id));
  if(item) item.qty += 1;
  else cart.push({ id: Number(id), qty: 1 });
  saveCart(cart);
}

function getCategoryFromBody(){
  return document.body?.dataset?.category || "";
}

function normalize(str){
  return String(str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
}

function renderEmpty(container, categoryLabel){
  container.innerHTML = `
    <div class="empty">
      <h2>Coleção em curadoria</h2>
      <p>Em breve vamos preencher <b>${categoryLabel}</b> com peças e itens de alto padrão. ✨</p>
      <a class="btn btn--light" href="index.html">Voltar ao início</a>
    </div>
  `;
}

function renderShop(){
  const grid = document.getElementById("shopGrid");
  const countEl = document.getElementById("resultCount");
  const sortSelect = document.getElementById("sortSelect");
  const searchInput = document.getElementById("searchInput");

  if(!grid) return;

  const category = getCategoryFromBody();
  const categoryLabel = category ? category.toUpperCase() : "a loja";

  // Base
  let list = [...PRODUCTS];

  // Filtra por categoria (se existir)
  if(category){
    list = list.filter(p => p.category === category);
  }

  // Busca
  const q = normalize(searchInput?.value || "");
  if(q){
    list = list.filter(p => normalize(p.name).includes(q));
  }

  // Ordenação
  const sort = sortSelect?.value || "best";
  if(sort === "low") list.sort((a,b)=> Number(a.price) - Number(b.price));
  if(sort === "high") list.sort((a,b)=> Number(b.price) - Number(a.price));

  if(countEl) countEl.textContent = `${list.length} item(s)`;

  // Sem produtos: estado bonito
  if(list.length === 0){
    renderEmpty(grid, categoryLabel);
    return;
  }

  // Render cards
  grid.innerHTML = list.map(p => `
    <article class="card">
      <a class="card__img" href="#" onclick="event.preventDefault();">
        <img src="${p.image}" alt="${p.name}">
        <span class="badge">Premium</span>
      </a>
      <div class="card__body">
        <h3 class="card__title">${p.name}</h3>
        <div class="price">
          <span class="now">${moneyBRL(p.price)}</span>
          ${p.comparePrice ? `<span class="compare">${moneyBRL(p.comparePrice)}</span>` : ``}
        </div>
        <div class="meta">${(p.category || "").toUpperCase()}</div>
        <button class="btn btn--card" type="button" data-add="${p.id}">Adicionar ao carrinho</button>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-add]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      addToCart(btn.getAttribute("data-add"));
      // feedback discreto
      btn.textContent = "Adicionado ✓";
      setTimeout(()=> btn.textContent = "Adicionar ao carrinho", 1100);
    });
  });
}

function initShopUX(){
  const sortSelect = document.getElementById("sortSelect");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.querySelector(".search__btn");

  sortSelect?.addEventListener("change", renderShop);
  searchInput?.addEventListener("input", ()=>{
    // leve debounce
    clearTimeout(window.__ds_search_t);
    window.__ds_search_t = setTimeout(renderShop, 120);
  });
  searchBtn?.addEventListener("click", renderShop);
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  initShopUX();
  renderShop();
});

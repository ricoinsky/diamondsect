// ======= Produtos (demo) =======
// Você pode editar aqui depois (id, nome, preço, categoria, ranking de "mais vendidos")
const PRODUCTS = [
  { id: "t1", name: "Terno Imperial Black", price: 1890, category: "ternos", soldRank: 1, img: "https://images.unsplash.com/photo-1593032465171-8a2b1c3e8f6b?auto=format&fit=crop&w=1200&q=70", colors: "4 cores disponíveis" },
  { id: "t2", name: "Smoking Midnight", price: 2490, category: "ternos", soldRank: 2, img: "https://images.unsplash.com/photo-1520975682071-aacbc3f4a78a?auto=format&fit=crop&w=1200&q=70", colors: "2 cores disponíveis" },
  { id: "t3", name: "Terno Sand Luxury", price: 1790, category: "ternos", soldRank: 3, img: "https://images.unsplash.com/photo-1592878897400-92c8c488bd89?auto=format&fit=crop&w=1200&q=70", colors: "3 cores disponíveis" },
  { id: "t4", name: "Terno Graphite", price: 1690, category: "ternos", soldRank: 4, img: "https://images.unsplash.com/photo-1542068829-1115f7259450?auto=format&fit=crop&w=1200&q=70", colors: "4 cores disponíveis" },

  { id: "p1", name: "Diamond Essence", price: 790, category: "perfumaria", soldRank: 1, img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=1200&q=70", colors: "2 variações" },
  { id: "p2", name: "Midnight Signature", price: 890, category: "perfumaria", soldRank: 2, img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=70", colors: "1 variação" },
  { id: "p3", name: "Gold Reserve", price: 990, category: "perfumaria", soldRank: 3, img: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=70", colors: "3 variações" },
  { id: "p4", name: "Velvet Noir", price: 840, category: "perfumaria", soldRank: 4, img: "https://images.unsplash.com/photo-1591375372226-3531e4c4f2f7?auto=format&fit=crop&w=1200&q=70", colors: "2 variações" },

  { id: "j1", name: "Anel Royal Gold", price: 2490, category: "joias", soldRank: 1, img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=70", colors: "1 cor disponível" },
  { id: "j2", name: "Pulseira Elite", price: 950, category: "joias", soldRank: 2, img: "https://images.unsplash.com/photo-1601121141461-9d664b7e0e71?auto=format&fit=crop&w=1200&q=70", colors: "3 variações" },
  { id: "j3", name: "Colar Signature", price: 1290, category: "joias", soldRank: 3, img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=70", colors: "2 variações" },
  { id: "j4", name: "Bracelete Noir", price: 1490, category: "joias", soldRank: 4, img: "https://images.unsplash.com/photo-1617038220319-276c8b3f6de0?auto=format&fit=crop&w=1200&q=70", colors: "1 variação" },
];

// ======= Carrinho (localStorage) =======
const CART_KEY = "diamondsect_cart";

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
}
function setCart(items){
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateCartBadge();
}
function addToCart(productId){
  const cart = getCart();
  cart.push(productId);
  setCart(cart);
  alert("Adicionado ao carrinho!");
}
function removeFromCartIndex(index){
  const cart = getCart();
  cart.splice(index, 1);
  setCart(cart);
}
function updateCartBadge(){
  const count = getCart().length;
  document.querySelectorAll(".cartcount").forEach(el => el.textContent = String(count));
}

// ======= Pesquisa + Ordenação + Render =======
function normalize(s){
  return (s || "").toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"");
}

function sortProducts(list, mode){
  const arr = [...list];
  if(mode === "best") arr.sort((a,b) => a.soldRank - b.soldRank);
  if(mode === "low") arr.sort((a,b) => a.price - b.price);
  if(mode === "high") arr.sort((a,b) => b.price - a.price);
  return arr;
}

function renderGrid(container, items){
  container.innerHTML = items.map(p => `
    <article class="card">
      <div class="card__img" style="background-image:url('${p.img}')"></div>
      <div class="card__body">
        <h3>${p.name}</h3>
        <p class="price">Preço promocional <strong>R$ ${p.price.toFixed(2).replace(".", ",")}</strong></p>
        <p class="meta">${p.colors}</p>
        <button class="btn btn--mini" type="button" data-add="${p.id}">Adicionar</button>
      </div>
    </article>
  `).join("");

  container.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.getAttribute("data-add")));
  });
}

function setupShopPage(){
  updateCartBadge();

  const pageCategory = document.body.getAttribute("data-category"); // ternos/perfumaria/joias
  const grid = document.getElementById("shopGrid");
  const countEl = document.getElementById("resultCount");
  const sortSel = document.getElementById("sortSelect");
  const searchInput = document.getElementById("searchInput");

  if(!grid) return;

  function apply(){
    const q = normalize(searchInput?.value);
    let list = PRODUCTS.filter(p => !pageCategory || p.category === pageCategory);

    if(q){
      list = list.filter(p => normalize(p.name).includes(q));
    }

    list = sortProducts(list, sortSel?.value || "best");

    renderGrid(grid, list);
    if(countEl) countEl.textContent = `${list.length} item(s)`;
  }

  sortSel?.addEventListener("change", apply);
  searchInput?.addEventListener("input", apply);

  apply();
}

// ======= Página carrinho =======
function setupCartPage(){
  updateCartBadge();

  const listEl = document.getElementById("cartList");
  const totalEl = document.getElementById("cartTotal");
  if(!listEl) return;

  function render(){
    const ids = getCart();
    const items = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

    listEl.innerHTML = items.map((p, idx) => `
      <div class="cartrow">
        <div class="cartrow__img" style="background-image:url('${p.img}')"></div>
        <div class="cartrow__info">
          <div class="cartrow__name">${p.name}</div>
          <div class="cartrow__meta">${p.colors}</div>
          <div class="cartrow__price">R$ ${p.price.toFixed(2).replace(".", ",")}</div>
        </div>
        <button class="btn btn--mini" type="button" data-rm="${idx}">Remover</button>
      </div>
    `).join("");

    listEl.querySelectorAll("[data-rm]").forEach(btn => {
      btn.addEventListener("click", () => {
        removeFromCartIndex(Number(btn.getAttribute("data-rm")));
        render();
      });
    });

    const total = items.reduce((s,p) => s + p.price, 0);
    if(totalEl) totalEl.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
  }

  render();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  setupShopPage();
  setupCartPage();
});

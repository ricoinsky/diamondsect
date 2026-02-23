/* =========================
   DIAMONDSECT — SHOP SYSTEM
   (produtos + busca + ordenação + carrinho)
========================= */

const LS_CART_KEY = "diamondsect_cart_v1";

/** Catálogo (imagens premium/realistas via Unsplash) */
const PRODUCTS = [
  // TERNOS
  {
    id: "t001",
    category: "ternos",
    name: "Terno Imperial Black",
    price: 1890.0,
    compareAt: 2290.0,
    soldScore: 96,
    colors: 4,
    image:
      "https://images.unsplash.com/photo-1520975682071-aacbc3f4a78a?auto=format&fit=crop&w=1400&q=75",
    badge: "Mais vendido",
  },
  {
    id: "t002",
    category: "ternos",
    name: "Smoking Midnight",
    price: 2490.0,
    compareAt: 2890.0,
    soldScore: 88,
    colors: 2,
    image:
      "https://images.unsplash.com/photo-1520975958225-02f6b1d04c51?auto=format&fit=crop&w=1400&q=75",
    badge: "Premium",
  },
  {
    id: "t003",
    category: "ternos",
    name: "Blazer Royale Grey",
    price: 1390.0,
    compareAt: 1690.0,
    soldScore: 72,
    colors: 3,
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1400&q=75",
    badge: "Alfaiataria",
  },
  {
    id: "t004",
    category: "ternos",
    name: "Terno Sand Elegance",
    price: 1790.0,
    compareAt: 2190.0,
    soldScore: 64,
    colors: 2,
    image:
      "https://images.unsplash.com/photo-1520975867590-0f2a0b5a0f9b?auto=format&fit=crop&w=1400&q=75",
    badge: "Novo",
  },

  // PERFUMARIA
  {
    id: "p001",
    category: "perfumaria",
    name: "Essência Noire",
    price: 349.0,
    compareAt: 449.0,
    soldScore: 90,
    colors: 1,
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=1400&q=75",
    badge: "Mais vendido",
  },
  {
    id: "p002",
    category: "perfumaria",
    name: "Signature Amber",
    price: 399.0,
    compareAt: 499.0,
    soldScore: 78,
    colors: 1,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1400&q=75",
    badge: "Assinatura",
  },
  {
    id: "p003",
    category: "perfumaria",
    name: "Citrus Prestige",
    price: 319.0,
    compareAt: 399.0,
    soldScore: 62,
    colors: 1,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=75",
    badge: "Refrescante",
  },

  // JOIAS
  {
    id: "j001",
    category: "joias",
    name: "Colar Diamond Drop",
    price: 590.0,
    compareAt: 790.0,
    soldScore: 86,
    colors: 1,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1400&q=75",
    badge: "Premium",
  },
  {
    id: "j002",
    category: "joias",
    name: "Anel Ouro Noir",
    price: 690.0,
    compareAt: 890.0,
    soldScore: 70,
    colors: 1,
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1400&q=75",
    badge: "Luxo",
  },
  {
    id: "j003",
    category: "joias",
    name: "Pulseira Atlas",
    price: 420.0,
    compareAt: 560.0,
    soldScore: 58,
    colors: 1,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=75",
    badge: "Elegância",
  },
];

/* ---------- helpers ---------- */
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

function getCartCount() {
  const cart = readCart();
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function setCartCountUI() {
  const count = getCartCount();
  document.querySelectorAll(".cartcount").forEach((el) => (el.textContent = String(count)));
}

function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const cart = readCart();
  const found = cart.find((i) => i.id === productId);

  if (found) found.qty += qty;
  else cart.push({ id: productId, qty });

  writeCart(cart);
  setCartCountUI();

  // feedback simples (premium sem alerta chato)
  const btn = document.querySelector(`[data-add="${productId}"]`);
  if (btn) {
    const old = btn.textContent;
    btn.textContent = "Adicionado ✓";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = old;
      btn.disabled = false;
    }, 900);
  }
}

/* ---------- render ---------- */
function getPageCategory() {
  // nas páginas de categoria você colocou: <body data-category="ternos">
  const body = document.body;
  const cat = body?.getAttribute("data-category");
  return cat || "all"; // home = all
}

function getQueryFromSearch() {
  const input = document.getElementById("searchInput");
  return (input?.value || "").trim().toLowerCase();
}

function sortProducts(list, sortValue) {
  const arr = [...list];
  if (sortValue === "low") arr.sort((a, b) => a.price - b.price);
  else if (sortValue === "high") arr.sort((a, b) => b.price - a.price);
  else arr.sort((a, b) => (b.soldScore || 0) - (a.soldScore || 0)); // best
  return arr;
}

function filterProducts() {
  const cat = getPageCategory();
  const q = getQueryFromSearch();
  const sortSel = document.getElementById("sortSelect");
  const sortValue = sortSel?.value || "best";

  let list = PRODUCTS;

  if (cat !== "all") list = list.filter((p) => p.category === cat);

  if (q) {
    list = list.filter((p) => {
      const hay = `${p.name} ${p.category} ${p.badge || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }

  list = sortProducts(list, sortValue);

  return list;
}

function productCard(p) {
  const compare = p.compareAt && p.compareAt > p.price ? `<span class="compare">${moneyBRL(p.compareAt)}</span>` : "";
  const colors = p.colors && p.colors > 1 ? `<div class="meta">${p.colors} cores disponíveis</div>` : `<div class="meta">&nbsp;</div>`;

  return `
    <article class="card">
      <a class="card__img" href="#" onclick="event.preventDefault();">
        <img src="${p.image}" alt="${p.name}" loading="lazy"/>
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      </a>

      <div class="card__body">
        <h3 class="card__title">${p.name}</h3>
        <div class="price">
          <span class="now">${moneyBRL(p.price)}</span>
          ${compare}
        </div>
        ${colors}
        <button class="btn btn--card" data-add="${p.id}" type="button">
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  `;
}

function renderGrid() {
  const grid = document.getElementById("shopGrid");
  if (!grid) return;

  const list = filterProducts();
  grid.innerHTML = list.map(productCard).join("");

  const countEl = document.getElementById("resultCount");
  if (countEl) countEl.textContent = `${list.length} item(s)`;

  // bind buttons
  grid.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.getAttribute("data-add"), 1));
  });
}

function bindSearchAndSort() {
  const input = document.getElementById("searchInput");
  const sortSel = document.getElementById("sortSelect");

  if (input) {
    input.addEventListener("input", () => renderGrid());
  }
  if (sortSel) {
    sortSel.addEventListener("change", () => renderGrid());
  }
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  setCartCountUI();
  bindSearchAndSort();
  renderGrid();
});

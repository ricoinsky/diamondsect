// =============================
// CATÁLOGO DE PRODUTOS
// =============================
const PRODUCTS = [
  {
    id: 1,
    name: "Terno Imperial Black",
    price: 1890,
    category: "ternos",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7"
  },
  {
    id: 2,
    name: "Smoking Midnight",
    price: 2490,
    category: "ternos",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38"
  },
  {
    id: 3,
    name: "Perfume Signature Noir",
    price: 590,
    category: "perfumaria",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601"
  },
  {
    id: 4,
    name: "Perfume Gold Essence",
    price: 790,
    category: "perfumaria",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d"
  },
  {
    id: 5,
    name: "Relógio Royal Silver",
    price: 1290,
    category: "joias",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314"
  },
  {
    id: 6,
    name: "Colar Diamond Luxe",
    price: 1590,
    category: "joias",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d"
  }
];

// 🔥 ESSA LINHA RESOLVE SEU PROBLEMA DO CARRINHO
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
  const cart = getCart();
  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }

  saveCart(cart);
  alert("Produto adicionado ao carrinho!");
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
// RENDER PRODUTOS (CATEGORIAS)
// =============================
function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

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
// INICIALIZAÇÃO
// =============================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProducts();
});

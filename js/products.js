const products = [
  {
    id: 1,
    name: "Terno Imperial Black",
    category: "ternos",
    price: 1890,
    image: "https://images.unsplash.com/photo-1593032465171-8a2b1c3e8f6b"
  },
  {
    id: 2,
    name: "Perfume Diamond Essence",
    category: "perfumaria",
    price: 790,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad"
  },
  {
    id: 3,
    name: "Anel Royal Gold",
    category: "joias",
    price: 2490,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d"
  }
];

function renderProducts(category = "all") {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "";

  const filtered = category === "all"
    ? products
    : products.filter(p => p.category === category);

  filtered.forEach(product => {
    container.innerHTML += `
      <div class="product">
        <img src="${product.image}" style="width:100%; height:250px; object-fit:cover;">
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Comprar</button>
      </div>
    `;
  });
}

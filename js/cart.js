let cart = [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  alert(product.name + " foi adicionado ao carrinho.");
}

async function checkout() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const response = await fetch("/.netlify/functions/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart })
  });

  const data = await response.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("Erro ao iniciar pagamento.");
  }
}

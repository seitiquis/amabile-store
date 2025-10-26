function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const lista = document.getElementById('listaCarrinho');
  const totalElement = document.getElementById('total');

  lista.innerHTML = '';

  if (carrinho.length === 0) {
    lista.innerHTML = '<p>Seu carrinho está vazio.</p>';
    totalElement.textContent = '0,00';
    return;
  }

  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;

    lista.innerHTML += `
      <div class="item-carrinho">
        <span>${item.nome}</span>
        <span>Qtd: ${item.quantidade}</span>
        <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
        <button onclick="removerItem(${index})">Remover</button>
      </div>
    `;
  });

  totalElement.textContent = total.toFixed(2);
}

function removerItem(index) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
}

function finalizarCompra() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuario) {
    alert("Você precisa estar logado para finalizar a compra!");
    window.location.href = "login.html";
    return;
  }

  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  window.location.href = "checkout.html";
}

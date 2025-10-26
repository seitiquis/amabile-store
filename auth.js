<<<<<<< HEAD
// ========================
// SISTEMA DE AUTENTICAÇÃO LOCAL
// ========================

// === CADASTRO ===
const cadastroForm = document.getElementById('cadastroForm');
if (cadastroForm) {
  cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const senha = document.getElementById('senha').value.trim();

    if (!nome || !email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Busca usuários já cadastrados
    const users = JSON.parse(localStorage.getItem('usuarios')) || [];
    const existe = users.find((u) => u.email === email);

    if (existe) {
      alert('Este e-mail já está cadastrado!');
      return;
    }

    // Salva novo usuário
    users.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(users));

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
  });
}

// === LOGIN ===
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const senha = document.getElementById('senha').value.trim();

    const users = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = users.find((u) => u.email === email && u.senha === senha);

    if (user) {
      localStorage.setItem('usuarioLogado', JSON.stringify(user));
      alert(`Bem-vindo(a), ${user.nome.split(' ')[0]}!`);
      window.location.href = 'index.html'; // volta pra home após login
    } else {
      alert('E-mail ou senha incorretos.');
    }
  });
}

// === VERIFICAÇÃO DE LOGIN (em páginas restritas) ===
function verificarLogin() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!usuario) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'login.html';
  }
}

// === LOGOUT ===
function logout() {
  localStorage.removeItem('usuarioLogado');
  alert('Você saiu da sua conta.');
  window.location.href = 'index.html'; // volta pra home
}
=======
// === Sistema de Login e Cadastro Local ===

// Função de login
function login() {
  const email = document.querySelector('input[type="email"]').value.trim();
  const senha = document.querySelector('input[type="password"]').value.trim();

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioValido = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuarioValido) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
    alert("Login realizado com sucesso!");
    window.location.href = "index.html"; // redireciona pro site principal
  } else {
    alert("E-mail ou senha incorretos. Tente novamente.");
  }
}

function cadastrar() {
  const nome = document.querySelector('input[name="nome"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const senha = document.querySelector('input[name="senha"]').value.trim();

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const jaExiste = usuarios.some(u => u.email === email);

  if (jaExiste) {
    alert("Este e-mail já está cadastrado!");
    return;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html"; // redireciona pro login
}

// Função de logout (chamada pelo botão 'Sair' na index)
function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "index.html";
}

// Exibe usuário logado (chamado no onload do index)
function carregarUsuario() {
  const user = JSON.parse(localStorage.getItem("usuarioLogado"));
  const area = document.getElementById("userArea");

  if (user) {
    area.innerHTML = `
      <div class="user-links">
        <span>Olá, ${user.nome.split(" ")[0]} 👋</span>
        <button onclick="logout()" 
          style="margin-left: 10px; background:none; border:none; color:#b18b56; font-weight:500; cursor:pointer;">
          Sair
        </button>
      </div>
      <div class="cart">
        <i class="fas fa-shopping-cart"></i>
        <span class="count">0</span>
      </div>
    `;
  } else {
    area.innerHTML = `
      <div class="user-links">
        <a href="login.html" class="login">Entre</a>
        <span class="divider">|</span>
        <a href="cadastro.html" class="register">Cadastre-se</a>
      </div>
      <div class="cart">
        <i class="fas fa-shopping-cart"></i>
        <span class="count">0</span>
      </div>
    `;
  }
}

>>>>>>> 7c7f02d9ed20649d4528bd795897f1f7f72dbb09

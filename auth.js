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

const botaoMenu = document.getElementById("botaoMenu");
const linksMenu = document.getElementById("linksMenu");

botaoMenu.addEventListener("click", function () {
  linksMenu.classList.toggle("aberto");
});

const links = linksMenu.querySelectorAll("a");
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    linksMenu.classList.remove("aberto");
  });
}

const botaoTema = document.getElementById("botaoTema");

function aplicarTema(tema) {
  if (tema === "claro") {
    document.body.classList.add("claro");
    botaoTema.textContent = "Modo escuro";
  } else {
    document.body.classList.remove("claro");
    botaoTema.textContent = "Modo claro";
  }
}

let temaSalvo = localStorage.getItem("tema");
if (temaSalvo === null) {
  temaSalvo = "escuro";
}
aplicarTema(temaSalvo);

botaoTema.addEventListener("click", function () {
  if (document.body.classList.contains("claro")) {
    localStorage.setItem("tema", "escuro");
    aplicarTema("escuro");
  } else {
    localStorage.setItem("tema", "claro");
    aplicarTema("claro");
  }
});

if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 800,
    once: true
  });
}

const formulario = document.getElementById("formulario");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoTelefone = document.getElementById("telefone");
const campoMensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");
const aviso = document.getElementById("aviso");

const modal = document.getElementById("modal");
const modalTexto = document.getElementById("modalTexto");
const modalConfirmar = document.getElementById("modalConfirmar");

campoNome.addEventListener("input", function () {
  campoNome.value = campoNome.value
    .replace(/[^A-Za-zÀ-ÿ\s]/g, "")
    .replace(/\s{2,}/g, " ");
});

campoNome.addEventListener("blur", function () {
  const palavras = campoNome.value.trim().toLowerCase().split(" ");
  for (let i = 0; i < palavras.length; i++) {
    if (palavras[i].length > 2) {
      palavras[i] = palavras[i].charAt(0).toUpperCase() + palavras[i].slice(1);
    }
  }
  campoNome.value = palavras.join(" ");
});

campoEmail.addEventListener("input", function () {
  campoEmail.value = campoEmail.value.toLowerCase().replace(/\s/g, "");
});

campoTelefone.addEventListener("input", function () {
  let numeros = campoTelefone.value.replace(/\D/g, "").slice(0, 11);

  if (numeros.length > 10) {
    numeros = numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else if (numeros.length > 6) {
    numeros = numeros.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  } else if (numeros.length > 2) {
    numeros = numeros.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
  } else if (numeros.length > 0) {
    numeros = numeros.replace(/^(\d{0,2})$/, "($1");
  }

  campoTelefone.value = numeros;
});

campoMensagem.addEventListener("input", function () {
  contador.textContent = campoMensagem.value.length + "/500";
});

function emailValido(email) {
  const posicaoArroba = email.indexOf("@");
  const posicaoPonto = email.lastIndexOf(".");
  return posicaoArroba > 0 && posicaoPonto > posicaoArroba + 1 && posicaoPonto < email.length - 1;
}

function mostrarErro(campo, texto) {
  campo.classList.add("erro");
  aviso.textContent = texto;
  aviso.classList.remove("ok");
  campo.focus();
}

function fecharModal() {
  modal.classList.remove("aberto");
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = campoNome.value.trim();
  const email = campoEmail.value.trim();
  const telefone = campoTelefone.value.trim();
  const mensagem = campoMensagem.value.trim();
  const digitosTelefone = telefone.replace(/\D/g, "");

  campoNome.classList.remove("erro");
  campoEmail.classList.remove("erro");
  campoTelefone.classList.remove("erro");
  campoMensagem.classList.remove("erro");
  aviso.textContent = "";

  if (nome === "") {
    mostrarErro(campoNome, "Digite seu nome.");
    return;
  }

  if (!emailValido(email)) {
    mostrarErro(campoEmail, "Digite um email válido, como nome@email.com.");
    return;
  }

  if (telefone !== "" && digitosTelefone.length < 10) {
    mostrarErro(campoTelefone, "Digite o telefone completo, com DDD.");
    return;
  }

  if (mensagem.length < 10) {
    mostrarErro(campoMensagem, "Escreva uma mensagem com pelo menos 10 letras.");
    return;
  }

  modalTexto.textContent = "Tudo certo, " + nome + "! Sua mensagem foi preenchida corretamente.";
  modal.classList.add("aberto");
});

modalConfirmar.addEventListener("click", function () {
  fecharModal();
  formulario.reset();
  contador.textContent = "0/500";
});

modal.addEventListener("click", function (evento) {
  if (evento.target === modal) {
    fecharModal();
  }
});

document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") {
    fecharModal();
  }
});

// ===============================
// VARIÁVEIS GLOBAIS
// ===============================
let bancoMensagens = [];
let bancoMensagensCarregado = false;

// ===============================
// CARREGAR MESSAGES.JSON
// ===============================
fetch("messages.json?v=" + Date.now())
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro HTTP: " + response.status);
    }
    return response.json();
  })
  .then(data => {
    if (!Array.isArray(data)) {
      throw new Error("messages.json não é um array");
    }

    bancoMensagens = data;
    bancoMensagensCarregado = true; // LINHA CRÍTICA

    console.log("messages.json carregado com sucesso:", bancoMensagens.length);
  })
  .catch(error => {
    console.error("Erro ao carregar messages.json:", error);
    alert("Erro ao carregar messages.json. Verifique o console.");
  });

// ===============================
// FUNÇÃO PARA FORMATAR NOME
// ===============================
function wmFormatarNome(nome) {
  if (!nome) return "";
  return nome
    .toLowerCase()
    .split(" ")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

// ===============================
// GERAR MENSAGEM
// ===============================
function gerarMensagem() {
  if (!bancoMensagensCarregado || !bancoMensagens.length) {
    alert("⏳ Aguarde: carregando messages.json...");
    return;
  }

  const nomeInput = document.getElementById("nome");
  const nome = nomeInput ? nomeInput.value.trim() : "";

  if (!nome) {
    alert("Informe o nome antes de gerar a mensagem.");
    return;
  }

  const mensagemBase =
    bancoMensagens[Math.floor(Math.random() * bancoMensagens.length)];

  const mensagemFinal = mensagemBase.replaceAll(
    "{nome}",
    wmFormatarNome(nome)
  );

  const campoMensagem = document.getElementById("mensagem");
  if (campoMensagem) {
    campoMensagem.value = mensagemFinal;
  }
}

// ===============================
// ENVIAR PARA WHATSAPP
// ===============================
function enviarWhatsapp() {
  const campoMensagem = document.getElementById("mensagem");
  if (!campoMensagem || !campoMensagem.value.trim()) {
    alert("Gere uma mensagem antes de enviar.");
    return;
  }

  const texto = encodeURIComponent(campoMensagem.value);
  const url = `https://wa.me/?text=${texto}`;
  window.open(url, "_blank");
}

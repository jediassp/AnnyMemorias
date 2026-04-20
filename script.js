// =========================
// BOTÃO WHATSAPP
// =========================
function comprar(produto) {

  // Validação básica:
  // evita que a função continue caso o produto não seja informado
  if (!produto) {
    console.error("Produto não informado");
    return;
  }

  // Monta a mensagem que será enviada no WhatsApp
  // Template string permite inserir variável diretamente
  const msg = `Olá, gostaria de pedir: ${produto}`;

  // Abre uma nova aba com o link do WhatsApp já preenchido
  // encodeURIComponent garante que a mensagem não quebre a URL
  window.open(
    `https://wa.me/5511991951470?text=${encodeURIComponent(msg)}`, 
    '_blank'
  );
}
// =========================
// FORMULÁRIO DE CONTATO
// =========================

// Espera o HTML carregar completamente antes de executar
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formContato");

  if (form) {

    const btn = document.getElementById("btnEnviar");
    const statusMsg = document.getElementById("statusMsg");

    form.addEventListener("submit", async function(e) {

      e.preventDefault();

      btn.innerText = "Enviando...";
      btn.disabled = true;

      statusMsg.classList.remove("hidden");
      statusMsg.classList.remove("text-red-600", "text-green-600");

      // Coleta dados do formulário
      const dados = {
        nome: form.nome.value,
        email: form.email.value,
        produto: form.produto.value,
        quantidade: form.quantidade.value,
        observacao: form.observacao.value,
        mensagem: form.mensagem.value
      };

      try {

        // =========================
        // 1. ENVIO DE EMAIL (EmailJS)
        // =========================
        await emailjs.send("service_5bxwleb", "template_duldpsg", dados);

        // =========================
        // 2. SALVAR NO GOOGLE SHEETS (HISTÓRICO)
        // =========================
        await fetch("https://script.google.com/macros/s/AKfycbxS0T3ez8RhrPtfM436ij-0duD3v__kLblJcuE7CjmWr-K1_Rfml_b-tY7uIgOs1raO/exec", {
          method: "POST",
          body: JSON.stringify(dados)
        });

        // Sucesso
        statusMsg.innerText = "✅ Pedido enviado e salvo no sistema!";
        statusMsg.classList.add("text-green-600");

        form.reset();

      } catch (error) {

        console.error(error);

        statusMsg.innerText = "❌ Erro ao enviar.";
        statusMsg.classList.add("text-red-600");
      }

      btn.innerText = "Enviar pedido";
      btn.disabled = false;

    });

  }

});
// =========================
// ANIMAÇÃO DO FORM
// =========================

// Aguarda carregamento total da página (inclui imagens, CSS, etc.)
window.addEventListener("load", () => {

  const formContainer = document.getElementById("formContainer");
  // Container do formulário

  if (formContainer) {

    // Pequeno delay para suavizar a entrada
    setTimeout(() => {
      // Remove classes que deixavam o elemento invisível/deslocado
      // Isso ativa a animação definida no CSS (Tailwind)
      formContainer.classList.remove("opacity-0", "translate-y-10");
    }, 200);

  }

});
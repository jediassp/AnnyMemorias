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
// =========================
// FORMULÁRIO
// =========================
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formContato");

  if (form) {

    const btn = document.getElementById("btnEnviar");
    const statusMsg = document.getElementById("statusMsg");

    form.addEventListener("submit", async function(e) {

      e.preventDefault();

      // 🔒 Proteção anti-spam (honeypot)
      if (form._gotcha.value) {
        console.warn("Spam detectado");
        return;
      }

      // Validação extra
      if (form.quantidade.value <= 0) {
        statusMsg.innerText = "❌ Quantidade inválida";
        statusMsg.classList.remove("hidden");
        statusMsg.classList.add("text-red-600");
        return;
      }

      btn.innerText = "Enviando...";
      btn.disabled = true;

      statusMsg.classList.remove("hidden");
      statusMsg.classList.remove("text-red-600", "text-green-600");

      try {

        await emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
          nome: form.nome.value,
          email: form.email.value,
          produto: form.produto.value,
          quantidade: form.quantidade.value,
          observacao: form.observacao.value,
          mensagem: form.mensagem.value
        });

        statusMsg.innerText = "✅ Pedido enviado com sucesso!";
        statusMsg.classList.add("text-green-600");

        form.reset();

      } catch (error) {

        console.error(error);

        statusMsg.innerText = "❌ Erro ao enviar. Tente novamente.";
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
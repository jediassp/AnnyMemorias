// =========================
// BOTÃO WHATSAPP
// =========================
function comprar(produto) {

  // Validação básica (evita erro se não vier produto)
  if (!produto) {
    console.error("Produto não informado");
    return;
  }

  // Cria a mensagem que será enviada
  const msg = `Olá, gostaria de pedir: ${produto}`;

  // Abre o WhatsApp com a mensagem já preenchida
  window.open(
    `https://wa.me/5511991951470?text=${encodeURIComponent(msg)}`, 
    '_blank'
  );
}


// =========================
// FORMULÁRIO DE CONTATO
// =========================

// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formContato");

  // Só executa se o formulário existir (evita erro no index.html)
  if (form) {

    const btn = document.getElementById("btnEnviar");
    const statusMsg = document.getElementById("statusMsg");

    form.addEventListener("submit", async function(e) {

      e.preventDefault();

      // Estado de loading
      btn.innerText = "Enviando...";
      btn.disabled = true;

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          statusMsg.classList.remove("hidden");
          statusMsg.innerText = "✅ Mensagem enviada com sucesso!";
          statusMsg.className = "text-green-600 text-center mt-4";

          form.reset();

        } else {
          statusMsg.classList.remove("hidden"); 
          statusMsg.innerText = "❌ Erro ao enviar.";
          statusMsg.className = "text-red-600 text-center mt-4";
        }

      } catch {

        statusMsg.innerText = "❌ Falha de conexão.";
        statusMsg.className = "text-red-600 text-center mt-4";
      }

      // Volta ao estado normal
      btn.innerText = "Enviar pedido";
      btn.disabled = false;
    });

  }

});


// =========================
// ANIMAÇÃO DO FORM
// =========================

// Aguarda carregamento completo da página
window.addEventListener("load", () => {

  const formContainer = document.getElementById("formContainer");

  if (formContainer) {

    setTimeout(() => {
      formContainer.classList.remove("opacity-0", "translate-y-10");
    }, 200);

  }

});
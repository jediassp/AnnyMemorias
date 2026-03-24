function comprar(produto) {
  const msg = `Olá, gostaria de pedir: ${produto}`;
  window.open(`https://wa.me/5511991951470?text=${encodeURIComponent(msg)}`, '_blank');
}
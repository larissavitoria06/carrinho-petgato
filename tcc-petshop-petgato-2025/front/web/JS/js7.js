const menuToggle = document.getElementById('menu-toggle');
const slideMenu = document.getElementById('slide-menu');

menuToggle.addEventListener('click',() => {
   slideMenu.classList.toggle('active');
   menuToggle.classList.toggle('active');
});




function abrirModal() {
  document.getElementById("meuModal").style.display = "block";
}

function fecharModal() {
  document.getElementById("meuModal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("meuModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
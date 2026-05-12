
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;




// Primera pintura del juego al cargar la página
dibujarTodo();

function dibujarTablero() {
  ctx.strokeStyle = "white" 
  ctx.beginPath()

  for(let i=0; i<=canvas.width; i+=TAMANIO_CELDA){
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvas.width)
    ctx.stroke()
  }
  for(let i=0; i<=canvas.height; i+=TAMANIO_CELDA){
    ctx.moveTo(0, i)
    ctx.lineTo(canvas.height, i)
    ctx.stroke()
  }
}

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
}




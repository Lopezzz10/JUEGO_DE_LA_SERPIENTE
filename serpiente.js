const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;
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
  pintarParte(5,5)
  pintarParte(10,2)
  pintarParte(7,23)
  pintarParte(23,5)
  pintarParte(0,17)
  pintarParte(23,23)
}

function pintarParte (lineaX, lineaY){
    ctx.fillStyle = "red"
    ctx.fillRect(
    lineaX * TAMANIO_CELDA,
    lineaY * TAMANIO_CELDA,
    TAMANIO_CELDA,
    TAMANIO_CELDA
  );
}




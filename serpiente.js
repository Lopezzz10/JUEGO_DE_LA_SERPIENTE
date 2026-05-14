const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;

const serpiente = [
  {x:10, y:10},
  {x:10, y:11},
  {x:11, y:11},
  {x:12, y:11},
  {x:13, y:11},
  {x:13, y:12},
  {x:14, y:12}
];

dibujarTodo();

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();

  for (let i = 0; i <= canvas.width; i += TAMANIO_CELDA) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  for (let i = 0; i <= canvas.height; i += TAMANIO_CELDA) {
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY) {
  const x = lineaX * TAMANIO_CELDA;
  const y = lineaY * TAMANIO_CELDA;

  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    // La cabeza (índice 0) va en amarillo, el cuerpo en rojo
    if (i === 0) {
      ctx.fillStyle = "yellow";
    } else {
      ctx.fillStyle = "red";
    }

    pintarParte(serpiente[i].x, serpiente[i].y);
  }
}

// Función principal que coordina todo el dibujo
function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
}
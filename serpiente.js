const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;

let velocidad = 300;

const SERPIENTE_INICIAL = [
  {x:10, y:10},
  {x:10, y:11},
  {x:11, y:11},
  {x:12, y:11},
  {x:13, y:11},
  {x:13, y:12},
  {x:14, y:12}
];

let SERPIENTE = SERPIENTE_INICIAL.map(p => ({...p}));

let intervaloSerpiente;
let direccionActual = "derecha";
let ultimaDireccion = "derecha";
let comida = generarPosicionComida();
let puntaje = 0;
let gameOver = false;
let juegoIniciado = false;

dibujarTodo();

function dibujarTablero() {
  ctx.strokeStyle = "white";
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
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < SERPIENTE.length; i++) {
    if (i === 0) {
      ctx.fillStyle = "yellow";
    } else {
      ctx.fillStyle = "red";
    }
    pintarParte(SERPIENTE[i].x, SERPIENTE[i].y);
  }
}

function pintarComida() {
  ctx.fillStyle = "lime";
  pintarParte(comida.x, comida.y);
}

function generarPosicionComida() {
  const columnasX = Math.floor(canvas.width / TAMANIO_CELDA);
  const filasY = Math.floor(canvas.height / TAMANIO_CELDA);
  const x = Math.floor(Math.random() * columnasX);
  const y = Math.floor(Math.random() * filasY);
  return { x, y };
}

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarGameOver() {
  ctx.fillStyle = "rgba(0,0,0,0.65)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff4444";
  ctx.font = "bold 56px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);

  ctx.fillStyle = "#ffffff";
  ctx.font = "24px Arial";
  ctx.fillText(`Puntaje final: ${puntaje}`, canvas.width / 2, canvas.height / 2 + 30);

  ctx.font = "18px Arial";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("Presiona Reiniciar para volver a jugar", canvas.width / 2, canvas.height / 2 + 65);

  ctx.textAlign = "left";
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
  if (gameOver) {
    dibujarGameOver();
  }
}

function moverDerecha() {
  const cabeza = SERPIENTE[0];
  SERPIENTE.unshift({ x: cabeza.x + 1, y: cabeza.y });
  SERPIENTE.pop();
}
function moverIzquierda() {
  const cabeza = SERPIENTE[0];
  SERPIENTE.unshift({ x: cabeza.x - 1, y: cabeza.y });
  SERPIENTE.pop();
}
function moverArriba() {
  const cabeza = SERPIENTE[0];
  SERPIENTE.unshift({ x: cabeza.x, y: cabeza.y - 1 });
  SERPIENTE.pop();
}
function moverAbajo() {
  const cabeza = SERPIENTE[0];
  SERPIENTE.unshift({ x: cabeza.x, y: cabeza.y + 1 });
  SERPIENTE.pop();
}

function atrapaComida() {
  const cabeza = SERPIENTE[0];
  return cabeza.x === comida.x && cabeza.y === comida.y;
}

function detectarColision() {
  const cabeza = SERPIENTE[0];
  const columnasX = Math.floor(canvas.width / TAMANIO_CELDA);
  const filasY = Math.floor(canvas.height / TAMANIO_CELDA);

  if (cabeza.x < 0 || cabeza.x >= columnasX || cabeza.y < 0 || cabeza.y >= filasY) {
    return true;
  }
  return false;
}

function moverSerpiente() {
  if (gameOver) return;

  ultimaDireccion = direccionActual;

  if (direccionActual === "derecha")        moverDerecha();
  else if (direccionActual === "izquierda") moverIzquierda();
  else if (direccionActual === "arriba")    moverArriba();
  else if (direccionActual === "abajo")     moverAbajo();

  if (detectarColision()) {
    terminarJuego();
    return;
  }

  if (atrapaComida()) {
    puntaje++;
    document.getElementById("puntaje").textContent = puntaje;

    const cola = SERPIENTE[SERPIENTE.length - 1];
    if (direccionActual === "derecha")        SERPIENTE.push({ x: cola.x - 1, y: cola.y });
    else if (direccionActual === "izquierda") SERPIENTE.push({ x: cola.x + 1, y: cola.y });
    else if (direccionActual === "arriba")    SERPIENTE.push({ x: cola.x, y: cola.y + 1 });
    else if (direccionActual === "abajo")     SERPIENTE.push({ x: cola.x, y: cola.y - 1 });

    comida = generarPosicionComida();
  }

  dibujarTodo();
}

function cambiarDireccion(direccion) {
  if (gameOver) return;

  const opuestas = {
    derecha: "izquierda",
    izquierda: "derecha",
    arriba: "abajo",
    abajo: "arriba"
  };

  if (direccion !== opuestas[ultimaDireccion]) {
    direccionActual = direccion;
  }
}

function terminarJuego() {
  clearInterval(intervaloSerpiente);
  gameOver = true;
  document.getElementById("estado").textContent = "Game Over";
  dibujarTodo();
}

function iniciarJuego() {
  if (gameOver) return;
  juegoIniciado = true;
  clearInterval(intervaloSerpiente);
  document.getElementById("estado").textContent = "Jugando";
  document.getElementById("mensaje").textContent = "¡Buena suerte!";
  intervaloSerpiente = setInterval(moverSerpiente, velocidad);
}

function pausarJuego() {
  if (gameOver) return;
  clearInterval(intervaloSerpiente);
  document.getElementById("estado").textContent = "Pausado";
  document.getElementById("mensaje").textContent = "Juego en pausa. Presiona Iniciar para continuar.";
}

function reiniciarJuego() {
  clearInterval(intervaloSerpiente);

  puntaje = 0;
  velocidad = 300;
  gameOver = false;
  juegoIniciado = false;
  direccionActual = "derecha";
  ultimaDireccion = "derecha";

  SERPIENTE = SERPIENTE_INICIAL.map(p => ({...p}));

  comida = generarPosicionComida();
  document.getElementById("puntaje").textContent = 0;
  document.getElementById("estado").textContent = "Listo";
  document.getElementById("mensaje").textContent = "Presiona Iniciar para comenzar.";

  dibujarTodo();
}
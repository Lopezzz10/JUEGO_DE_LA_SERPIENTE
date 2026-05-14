const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;

const SERPIENTE = [
  {x:10, y:10},
  {x:10, y:11},
  {x:11, y:11},
  {x:12, y:11},
  {x:13, y:11},
  {x:13, y:12},
  {x:14, y:12}
];

let intervaloSerpiente;
let direccionActual = "derecha";
let comida = generarPosicionComida();
let puntaje = 0;

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

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
}

function moverDerecha() {
  const cabeza = SERPIENTE[0];
  const nuevaCabeza = { x: cabeza.x + 1, y: cabeza.y };
  SERPIENTE.unshift(nuevaCabeza);
  SERPIENTE.pop();
}

function moverIzquierda() {
  const cabeza = SERPIENTE[0];
  const nuevaCabeza = { x: cabeza.x - 1, y: cabeza.y };
  SERPIENTE.unshift(nuevaCabeza);
  SERPIENTE.pop();
}

function moverArriba() {
  const cabeza = SERPIENTE[0];
  const nuevaCabeza = { x: cabeza.x, y: cabeza.y - 1 };
  SERPIENTE.unshift(nuevaCabeza);
  SERPIENTE.pop();
}

function moverAbajo() {
  const cabeza = SERPIENTE[0];
  const nuevaCabeza = { x: cabeza.x, y: cabeza.y + 1 };
  SERPIENTE.unshift(nuevaCabeza);
  SERPIENTE.pop();
}

function atrapaComida() {
  const cabeza = SERPIENTE[0];
  return cabeza.x === comida.x && cabeza.y === comida.y;
}

function moverSerpiente() {
  if (direccionActual === "derecha") {
    moverDerecha();
  } else if (direccionActual === "izquierda") {
    moverIzquierda();
  } else if (direccionActual === "arriba") {
    moverArriba();
  } else if (direccionActual === "abajo") {
    moverAbajo();
  }

  if (atrapaComida()) {
    puntaje++;
    document.getElementById("puntaje").textContent = puntaje;

    const cola = SERPIENTE[SERPIENTE.length - 1];
    if (direccionActual === "derecha") {
      SERPIENTE.push({ x: cola.x - 1, y: cola.y });
    } else if (direccionActual === "izquierda") {
      SERPIENTE.push({ x: cola.x + 1, y: cola.y });
    } else if (direccionActual === "arriba") {
      SERPIENTE.push({ x: cola.x, y: cola.y + 1 });
    } else if (direccionActual === "abajo") {
      SERPIENTE.push({ x: cola.x, y: cola.y - 1 });
    }

    comida = generarPosicionComida();
  }

  dibujarTodo();
}

function cambiarDireccion(direccion) {
  direccionActual = direccion;
}

function iniciarJuego() {
  clearInterval(intervaloSerpiente);
  document.getElementById("estado").textContent = "Jugando";
  intervaloSerpiente = setInterval(moverSerpiente, 200);
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
  document.getElementById("estado").textContent = "Pausado";
}

function reiniciarJuego() {
  clearInterval(intervaloSerpiente);
  puntaje = 0;
  document.getElementById("puntaje").textContent = 0;
  document.getElementById("estado").textContent = "Listo";
  direccionActual = "derecha";
  SERPIENTE.length = 0;
  SERPIENTE.push(
    {x:10, y:10}, {x:10, y:11}, {x:11, y:11},
    {x:12, y:11}, {x:13, y:11}, {x:13, y:12}, {x:14, y:12}
  );
  comida = generarPosicionComida();
  dibujarTodo();
}